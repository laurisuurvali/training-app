import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Meal} from '../../../../../../../_models/meal';
import {MealType} from '../../../../../../../_models/meal-type';
import {MealService} from '../../../../../../../_services/admin/meal.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-meal-edit',
  templateUrl: './meal-edit.component.html',
  styleUrls: ['./meal-edit.component.css']
})
export class MealEditComponent implements OnInit{

  mealForm: FormGroup;
  mealTypes = Object.values(MealType);
  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<MealEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Meal,
              public dataService: MealService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) { }


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

  stopEdit(): void {
    this.dataService.updateMeal(this.data).subscribe(data => {
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
