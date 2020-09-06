import {Component, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {Meal} from '../../../../_models/meal';


@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MealComponent implements OnChanges {

  @Input() weekNumberId = -1;
  @Input() weekDayNumberId = -1;

  breakfastIsVisible = false;
  lunchIsVisible = false;
  secondLunchIsVisible = false;
  dinnerIsVisible = false;

  @Input() breakfastMeals: Meal[] = [];
  @Input() lunchMeals: Meal[] = [];
  @Input() secondLunchMeals: Meal[] = [];
  @Input() dinnerMeals: Meal[] = [];

  breakfastIndex = 0;
  lunchIndex = 0;
  secondLunchIndex = 0;
  dinnerIndex = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.breakfastIndex = 0;
    this.lunchIndex = 0;
    this.secondLunchIndex = 0;
    this.dinnerIndex = 0;

    this.setMealTypeVisibility('breakfastIsVisible', 'breakfastMeals');
    this.setMealTypeVisibility('lunchIsVisible', 'lunchMeals');
    this.setMealTypeVisibility('secondLunchIsVisible', 'secondLunchMeals');
    this.setMealTypeVisibility('dinnerIsVisible', 'dinnerMeals');
  }

  setMealTypeVisibility(mealTypeIsVisible: string, mealTypeMeals: string): void {
    this[mealTypeIsVisible] = this[mealTypeMeals][0].challengeDay.id.weekNumberId === this.weekNumberId &&
      this[mealTypeMeals][0].challengeDay.id.dayNumberId === this.weekDayNumberId;
  }

  onSwipeLeft(index: string, meals: string): void {
    if (this[index] === 0) {
      this[index] = this[meals].length - 1;
    }
    else if (this[index] > 0) {
      this[index]--;
    }
  }

  onSwipeRight(index: string, meals: string): void {
    if (this[meals].length > this[index]) {
      this[index]++;
    }
    if (this[meals].length === this[index]) {
      this[index] = 0;
    }
  }

}
