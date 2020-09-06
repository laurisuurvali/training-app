import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Challenge} from '../../../_models/challenge';
import {Instruction} from '../../../_models/instruction';
import {Meal} from '../../../_models/meal';
import {TokenStorageService} from '../../../_services/security/token-storage.service';
import {UserChallengeService} from '../../../_services/user/user-challenge.service';
import {UserInstructionService} from '../../../_services/user/user-instruction.service';
import {UserMealService} from '../../../_services/user/user-meal.service';
import {UserSubscriptionService} from '../../../_services/user/user-subscription.service';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css'],
})

export class NutritionComponent implements OnInit {

  currentWeekNumberId: number;
  currentWeekDayNumberId: number;
  selectWeekNumberId: number;
  selectWeekDayNumberId: number;
  subscriptionId: number;
  challenge: Challenge = new Challenge();

  twoWeekInstructions: Instruction[] = [];
  currentDayInstructions: Instruction[] = [];

  twoWeekMeals: Meal[] = [];
  breakfastMeals: Meal[] = [];
  lunchMeals: Meal[] = [];
  secondLunchMeals: Meal[] = [];
  dinnerMeals: Meal[] = [];

  days: Day[] = [
    {value: '1', viewValue: 'Päev 1'},
    {value: '2', viewValue: 'Päev 2'},
    {value: '3', viewValue: 'Päev 3'},
    {value: '4', viewValue: 'Päev 4'},
    {value: '5', viewValue: 'Päev 5'},
    {value: '6', viewValue: 'Päev 6'},
    {value: '7', viewValue: 'Päev 7'},
  ];
  weeks: Week[] = [];

  dayFilter = new FormControl('');
  weekFilter = new FormControl('');

  currentWeekday: string;
  currentDate: Date;
  weekdaysInEstonian: string[] = [
    'Pühapäev',
    'Esmaspäev',
    'Teisipäev',
    'Kolmapäev',
    'Neljapäev',
    'Reede',
    'Laupäev'
  ];

  constructor(private tokenStorage: TokenStorageService,
              private userMealService: UserMealService,
              private userSubscriptionService: UserSubscriptionService,
              private userChallengeService: UserChallengeService,
              private userInstructionService: UserInstructionService) {

  }

  ngOnInit(): void {
    this.currentWeekDayNumberId = -1;
    this.currentWeekNumberId = -1;
    if (this.tokenStorage.getToken()) {
      this.subscriptionId = this.tokenStorage.getTokenPayLoad().subscriptionId;
    }
    this.userSubscriptionService.getCurrentSubscriptionWeekNumber().subscribe(result => {
      this.currentWeekNumberId = result;
      this.weeks = [
        {value: '', viewValue: 'Käesolev nädal'},
        {value: '', viewValue: 'Järgmine nädal'}
      ];
      this.weeks[0].value = this.currentWeekNumberId.toString();
      this.weeks[1].value = (this.currentWeekNumberId + 1).toString();
      this.selectWeekNumberId = this.currentWeekNumberId;
      this.weekFilter.setValue(this.selectWeekNumberId.toString());
    });
    this.userSubscriptionService.getCurrentSubscriptionWeekDayNumber().subscribe(result => {
      this.currentWeekDayNumberId = result;
      this.selectWeekDayNumberId = this.currentWeekDayNumberId;
      this.dayFilter.setValue(this.selectWeekDayNumberId.toString());
    });

    this.userMealService.getTwoWeekMeals().subscribe(result => {
      this.twoWeekMeals = result;
      this.setMealsByDayId(this.selectWeekNumberId, this.selectWeekDayNumberId);
    });

    this.userInstructionService.getTwoWeekMealInstructions().subscribe(result => {
      this.twoWeekInstructions = result;
      this.currentDayInstructions = this.getInstructionsByDayId(this.selectWeekNumberId, this.selectWeekDayNumberId);
    });

    this.userChallengeService.getSubscriptionChallenge().subscribe(result => {
      this.challenge = result;
      if (this.currentWeekNumberId === this.challenge.weekQuantity) {
        this.weeks.pop();
      }
    });

    this.weekFilter.valueChanges
      .subscribe(
        week => {
          this.selectWeekNumberId = parseInt(week, 10);
          this.currentDayInstructions = this.getInstructionsByDayId(this.selectWeekNumberId, this.selectWeekDayNumberId);
          this.setMealsByDayId(this.selectWeekNumberId, this.selectWeekDayNumberId);
        }
      );
    this.dayFilter.valueChanges
      .subscribe(
        day => {
          this.selectWeekDayNumberId = parseInt(day, 10);
          this.currentDayInstructions = this.getInstructionsByDayId(this.selectWeekNumberId, this.selectWeekDayNumberId);
          this.setMealsByDayId(this.selectWeekNumberId, this.selectWeekDayNumberId);
        }
      );

    this.currentWeekday = this.weekdaysInEstonian[new Date().getDay()];
    this.currentDate = new Date();
  }

  setMealsByDayId(weekNumberId: number, dayNumberId: number): void {

    this.lunchMeals = this.twoWeekMeals.filter(meal => meal.mealType === 'LUNCH');
    this.lunchMeals.sort(this.sortByWeekNumberIdAndDayNumberId(weekNumberId, dayNumberId));

    this.breakfastMeals = this.twoWeekMeals.filter((meal => meal.mealType === 'BREAKFAST'));
    this.breakfastMeals.sort(this.sortByWeekNumberIdAndDayNumberId(weekNumberId, dayNumberId));

    this.secondLunchMeals = this.twoWeekMeals.filter((meal => meal.mealType === 'SECOND_LUNCH'));
    this.secondLunchMeals.sort(this.sortByWeekNumberIdAndDayNumberId(weekNumberId, dayNumberId));

    this.dinnerMeals = this.twoWeekMeals.filter((meal => meal.mealType === 'DINNER'));
    this.dinnerMeals.sort(this.sortByWeekNumberIdAndDayNumberId(weekNumberId, dayNumberId));
  }

  sortByWeekNumberIdAndDayNumberId(weekNumberId: number, dayNumberId: number): any {
    return meal => {
      if (meal.challengeDay.id.weekNumberId === weekNumberId
        && meal.challengeDay.id.dayNumberId === dayNumberId) {
        return -1;
      }
      return 0;
    };
  }

  getInstructionsByDayId(weekNumberId: number, dayNumberId: number): Instruction[] {
    return this.twoWeekInstructions.filter(instruction =>
      instruction.challengeDay.id.weekNumberId === weekNumberId && instruction.challengeDay.id.dayNumberId === dayNumberId)
      .sort((a, b) => (a.instructionId) - (b.instructionId));
  }
}

export interface Day {
  value: string;
  viewValue: string;
}

export interface Week {
  value: string;
  viewValue: string;
}
