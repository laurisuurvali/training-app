import {ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortable} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DomSanitizer} from '@angular/platform-browser';

import {ActivatedRoute, Router} from '@angular/router';
import {ChallengeDay} from '../../../../../_models/challenge-day';
import {Exercise} from '../../../../../_models/exercise';
import {ExerciseType} from '../../../../../_models/exercise-type';
import {ChallengeDayService} from '../../../../../_services/admin/challenge-day.service';
import {ExerciseService} from '../../../../../_services/admin/exercise.service';
import {ExerciseAddComponent} from './dialogs/exercise-add/exercise-add.component';
import {ExerciseDeleteComponent} from './dialogs/exercise-delete/exercise-delete.component';
import {ExerciseEditComponent} from './dialogs/exercise-edit/exercise-edit.component';
import {ExercisePreviewComponent} from './dialogs/exercise-preview/exercise-preview.component';

@Component({
  selector: 'app-exercise-admin',
  templateUrl: './exercise-admin.component.html',
  styleUrls: ['./exercise-admin.component.css'],
})
export class ExerciseAdminComponent implements OnChanges {

  @Input() dayNumberId: number;
  @Input() weekNumberId: number;

  displayedColumns = ['orderNumber', 'exerciseType', 'exerciseName', 'exerciseId', 'reps', 'sets', 'exerciseBreak', 'preview', 'actions'];
  dataSource: MatTableDataSource<Exercise>;
  challengeId: number;
  challengeDay: ChallengeDay = new ChallengeDay();
  id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              public service: ExerciseService,
              public router: Router,
              public route: ActivatedRoute,
              private changeDetectorRefs: ChangeDetectorRef,
              public challengeDayService: ChallengeDayService,
              public sanitizer: DomSanitizer
  ) {
    this.challengeId = route.snapshot.params.id;
    this.route.queryParams.subscribe(params => {
      this.weekNumberId = params.weekNumberId;
      this.dayNumberId = params.dayNumberId;
    });
    this.dataSource = new MatTableDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dayNumberId || changes.weekNumberId) {
      this.loadData();
      this.sort.sort(({id: 'orderNumber', start: 'asc'}) as MatSortable);
    }
    this.challengeDayService.getChallengeDayBySeparateId(this.challengeId,
      this.weekNumberId.toString(),
      this.dayNumberId.toString()).subscribe(result => {
        this.challengeDay = result;
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNew(): void {
    const dialogRef = this.dialog.open(ExerciseAddComponent, {
      data: {
        currentChallengeDay: this.challengeDay,
        exercise: Exercise
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  details(id: number): void {
    this.router.navigate([id], {relativeTo: this.route});

  }

  previewExercise(exercise: Exercise): void {
    exercise.videoLinkSRU = this.sanitizer.bypassSecurityTrustResourceUrl(exercise.videoLink);
    const dialogRef = this.dialog.open(ExercisePreviewComponent, {
      panelClass: 'preview-panel',
      data: {exercise}
    });
  }

  deleteItem(exerciseId: number, exerciseName: string): void {
    this.id = exerciseId;
    const dialogRef = this.dialog.open(ExerciseDeleteComponent, {
      data: {exerciseId, exerciseName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  startEdit(exerciseId: number,
            exerciseName: string,
            exerciseType: ExerciseType,
            orderNumber: number,
            description: string,
            reps: number,
            sets: number,
            exerciseBreak: number,
            videoLink: string): void {
    this.id = exerciseId;

    const dialogRef = this.dialog.open(ExerciseEditComponent, {
      data: {
        exerciseId,
        exerciseName,
        exerciseType,
        orderNumber,
        description,
        reps,
        sets,
        exerciseBreak,
        videoLink,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  loadData(): void {
    this.service.getExercisesByChallengeDayId(
      this.challengeId.toString(), this.weekNumberId.toString(), this.dayNumberId.toString()).subscribe(result => {
      this.dataSource.data = result;
    });
    this.changeDetectorRefs.detectChanges();
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;
  }
}





