import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Exercise} from '../../../../../../../_models/exercise';
import {ExerciseType} from '../../../../../../../_models/exercise-type';
import {ExerciseService} from '../../../../../../../_services/admin/exercise.service';
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
  styleUrls: ['./exercise-edit.component.css']
})
export class ExerciseEditComponent implements OnInit {

  exerciseForm: FormGroup;
  exerciseTypes = Object.values(ExerciseType);
  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<ExerciseEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Exercise,
              public dataService: ExerciseService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  submit(): void  {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public stopEdit(): void {
    this.dataService.updateExercise(this.data).subscribe(data => {
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

  buildForm(): void  {
    this.exerciseForm = this.fb.group({
      orderNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      exerciseType: ['', [Validators.required]],
      exerciseName: ['', Validators.required],
      description: ['', [Validators.required]],
      reps: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      sets: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      exerciseBreak: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      videoLink: ['', [Validators.required]]
    });
  }
}
