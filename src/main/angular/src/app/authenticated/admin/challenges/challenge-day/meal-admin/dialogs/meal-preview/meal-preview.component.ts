import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Meal} from '../../../../../../../_models/meal';

@Component({
  selector: 'app-meal-preview',
  templateUrl: './meal-preview.component.html',
  styleUrls: ['./meal-preview.component.css']
})
export class MealPreviewComponent implements OnInit {

  meals: Meal[] = [];
  constructor(public dialogRef: MatDialogRef<MealPreviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.meals.push(this.data.meal);
  }
}
