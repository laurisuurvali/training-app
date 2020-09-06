import {ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {ChallengeDay} from '../../../../../_models/challenge-day';
import {Exercise} from '../../../../../_models/exercise';
import {Instruction} from '../../../../../_models/instruction';
import {InstructionType} from '../../../../../_models/instruction-type';
import {MediaType} from '../../../../../_models/media-type';
import {ChallengeDayService} from '../../../../../_services/admin/challenge-day.service';
import {InstructionService} from '../../../../../_services/admin/instruction.service';
import {InstructionAddComponent} from './dialogs/instruction-add/instruction-add.component';
import {InstructionDeleteComponent} from './dialogs/instruction-delete/instruction-delete.component';
import {InstructionEditComponent} from './dialogs/instruction-edit/instruction-edit.component';
import {InstructionPreviewComponent} from './dialogs/instruction-preview/instruction-preview.component';

@Component({
  selector: 'app-instruction-admin',
  templateUrl: './instruction-admin.component.html',
  styleUrls: ['./instruction-admin.component.css']
})
export class InstructionAdminComponent implements OnChanges {

  @Input() dayNumberId: number;
  @Input() weekNumberId: number;

  displayedColumns = ['instructionId', 'instructionType', 'stepCount', 'instructionBody', 'mediaType', 'mediaLink', 'preview', 'actions'];

  dataSource: MatTableDataSource<Instruction>;
  challengeId: number;
  challengeDay: ChallengeDay = new ChallengeDay();
  id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              public service: InstructionService,
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

  previewInstruction(instruction: Instruction): void {
    if (instruction.mediaType === 'VIDEO') {
      instruction.mediaLinkSRU = this.sanitizer.bypassSecurityTrustResourceUrl(instruction.mediaLink);
    }
    const dialogRef = this.dialog.open(InstructionPreviewComponent, {
      panelClass: 'preview-panel-instruction',
      data: {instruction}
    });
  }

  addNew(): void {
    const dialogRef = this.dialog.open(InstructionAddComponent, {
      data: {
        mediaType: 'NONE',
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

  deleteItem(instructionId: number, instructionType: InstructionType, instructionBody: string): void {
    this.id = instructionId;
    const dialogRef = this.dialog.open(InstructionDeleteComponent, {
      data: {instructionId, instructionType, instructionBody}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  startEdit(instructionId: number,
            instructionType: InstructionType,
            stepCount: string,
            instructionBody: string,
            mediaType: MediaType,
            mediaLink: string): void {
    this.id = instructionId;

    const dialogRef = this.dialog.open(InstructionEditComponent, {
      data: {
        instructionId,
        instructionType,
        stepCount,
        instructionBody,
        mediaType,
        mediaLink
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  loadData(): void {
    this.service.getInstructionsByChallengeDayId(
      this.challengeId.toString(), this.weekNumberId.toString(), this.dayNumberId.toString()).subscribe(result => {
      this.dataSource.data = result;
    });
    this.changeDetectorRefs.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
