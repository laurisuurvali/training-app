import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Meal} from '../../../../../../../_models/meal';
import {MealType} from '../../../../../../../_models/meal-type';
import {MealService} from '../../../../../../../_services/admin/meal.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-meal-add',
  templateUrl: './meal-add.component.html',
  styleUrls: ['./meal-add.component.css']
})
export class MealAddComponent implements OnInit {

  mealForm: FormGroup;
  meal: Meal = new Meal();
  mealTypes = Object.values(MealType);
  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<MealAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public mealService: MealService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.mealForm = this.fb.group({
      mealType: ['', Validators.required],
      mealName: ['', Validators.required],
      calories: ['', Validators.required],
      carbohydrates: ['', Validators.required],
      fat: ['', Validators.required],
      protein: ['', Validators.required],
      recipe: ['', [Validators.required]],
      imageLink: ['', [Validators.required]],
    });
  }

  submit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.meal.challengeDay = this.data.currentChallengeDay;
    this.meal.mealType = this.data.mealType;
    this.meal.mealName = this.data.mealName;
    this.meal.calories = this.data.calories;
    this.meal.carbohydrates = this.data.carbohydrates;
    this.meal.fat = this.data.fat;
    this.meal.protein = this.data.protein;
    this.meal.recipe = this.data.recipe;
    this.meal.imageLink = this.data.imageLink;
    this.mealService.addMeal(this.meal).subscribe(data => {
      this.dialogRef.close(1);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
        console.log(error.name + ' ' + error.message);
        this.snackBar.open(this.errorMessage, null, {
          duration: 2000,
        });
      });
  }
}
