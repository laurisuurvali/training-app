import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ExerciseService} from '../../../../../../../_services/admin/exercise.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-exercise-delete',
  templateUrl: './exercise-delete.component.html',
  styleUrls: ['./exercise-delete.component.css']
})
export class ExerciseDeleteComponent {

  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<ExerciseDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: ExerciseService,
              private snackBar: MatSnackBar) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteExercise(this.data.exerciseId).subscribe(data => {
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
