import {ChallengeDay} from './challenge-day';
import {MealType} from './meal-type';

export class Meal {
  mealId: number;
  mealType: MealType;
  mealName: string;
  calories: string;
  carbohydrates: string;
  fat: string;
  protein: string;
  recipe: string;
  imageLink: string;
  challengeDay: ChallengeDay;
}
