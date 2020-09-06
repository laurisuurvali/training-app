import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MealService} from '../../../../../../../_services/admin/meal.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-meal-delete',
  templateUrl: './meal-delete.component.html',
  styleUrls: ['./meal-delete.component.css']
})
export class MealDeleteComponent {

  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<MealDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: MealService,
              private snackBar: MatSnackBar) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteMeal(this.data.mealId).subscribe(data => {
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
