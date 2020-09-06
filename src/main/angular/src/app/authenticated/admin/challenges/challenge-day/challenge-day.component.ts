import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
import {Challenge} from '../../../../_models/challenge';
import {ChallengeDayService} from '../../../../_services/admin/challenge-day.service';
import {ChallengeService} from '../../../../_services/admin/challenge.service';


@Component({
  selector: 'app-challenge-day',
  templateUrl: './challenge-day.component.html',
  styleUrls: ['./challenge-day.component.css']
})
export class ChallengeDayComponent implements OnInit {

  challengeId: number;
  weekNumberId: number;
  dayNumberId: number;
  challenge: Challenge = new Challenge();
  weeks: string[] = [];
  weekDays: Array<number> = [1, 2, 3, 4, 5, 6, 7];

  dayFilter = new FormControl('');
  weekFilter = new FormControl('');

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private activateRoute: ActivatedRoute,
              public challengeService: ChallengeService,
              public challengeDayService: ChallengeDayService,
              public router: Router,
              public dialog: MatDialog) {
    this.challengeId = activateRoute.snapshot.params.id;
    this.activateRoute.queryParams.subscribe(params => {
      this.weekNumberId = params.weekNumberId;
      this.dayNumberId = params.dayNumberId;
      this.weekFilter.setValue(parseInt(params.weekNumberId, 10));
      this.dayFilter.setValue(parseInt(params.dayNumberId, 10));
    });
  }

  ngOnInit(): void {
    this.challengeService.getChallengeById(this.challengeId).subscribe(result => {
      this.challenge = result;
      this.weeks = Array.apply(null, {length: ((this.challenge.weekQuantity) + 1)}).map(Number.call, Number).slice(1);
    });


    this.weekFilter.valueChanges
      .subscribe(
        weekNumberId => {
          this.navigateToChallengeDay(weekNumberId, this.dayNumberId);
        }
      );
    this.dayFilter.valueChanges
      .subscribe(
        dayNumberId => {
          this.navigateToChallengeDay(this.weekNumberId, dayNumberId);
        }
      );
  }

  navigateToChallengeDay(weekNumberId: number, dayNumberId: number): void {
    this.router.navigate(['admin/challenges/' + this.challengeId + '/challenge_days'], {
      queryParams: {
        weekNumberId,
        dayNumberId
      }
    });
  }

}
