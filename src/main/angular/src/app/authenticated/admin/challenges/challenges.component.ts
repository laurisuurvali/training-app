import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {Challenge} from '../../../_models/challenge';
import {Meal} from '../../../_models/meal';
import {ChallengeService} from '../../../_services/admin/challenge.service';
import {ChallengeAddComponent} from './dialogs/challenge-add/challenge-add.component';
import {ChallengeDeleteComponent} from './dialogs/challenge-delete/challenge-delete.component';
import {ChallengeEditComponent} from './dialogs/challenge-edit/challenge-edit.component';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {


  displayedColumns = ['challengeId', 'challengeName', 'weekQuantity', 'challengeDetails', 'actions'];
  dataSource: MatTableDataSource<Challenge>;
  index: number;
  id: number;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              public service: ChallengeService,
              private changeDetectorRefs: ChangeDetectorRef,
              public router: Router,
              public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.loadData();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNew(): void {
    const dialogRef = this.dialog.open(ChallengeAddComponent, {
      data: {meal: Meal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 1) {
        this.loadData();
      }
    });
  }

  details(id: number): void {
    this.router.navigate(['admin/challenges/' + id + '/challenge_days'], {
      queryParams: {
        weekNumberId: 1,
        dayNumberId: 1
      }
    });

  }

  deleteItem(i: number, challengeId: number, challengeName: string): void {
    this.index = i;
    this.id = challengeId;
    const dialogRef = this.dialog.open(ChallengeDeleteComponent, {
      data: {challengeId, challengeName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  startEdit(i: number,
            challengeId: number,
            challengeName: string,
            weekQuantity: number,
            challenge: Challenge): void {
    this.id = challengeId;
    this.index = i;
    const dialogRef = this.dialog.open(ChallengeEditComponent, {
      data: {challengeId, challengeName, weekQuantity, challenge}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  loadData(): void {
    this.service.getAllChallenges().subscribe(result => {
      this.dataSource.data = result;
    });
    this.changeDetectorRefs.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
