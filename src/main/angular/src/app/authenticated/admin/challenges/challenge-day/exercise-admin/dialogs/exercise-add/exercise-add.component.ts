import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Exercise} from '../../../../../../../_models/exercise';
import {ExerciseType} from '../../../../../../../_models/exercise-type';
import {ExerciseService} from '../../../../../../../_services/admin/exercise.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-exercise-add',
  templateUrl: './exercise-add.component.html',
  styleUrls: ['./exercise-add.component.css']
})
export class ExerciseAddComponent implements OnInit {

  exerciseForm: FormGroup;
  exercise: Exercise = new Exercise();
  exerciseTypes = Object.values(ExerciseType);
  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<ExerciseAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: ExerciseService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void  {
    this.buildForm();
  }

  submit(): void  {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.exercise.challengeDay = this.data.currentChallengeDay;
    this.exercise.exerciseName = this.data.exerciseName;
    this.exercise.orderNumber = this.data.orderNumber;
    this.exercise.description = this.data.description;
    this.exercise.sets = this.data.sets;
    this.exercise.reps = this.data.reps;
    this.exercise.exerciseBreak = this.data.exerciseBreak;
    this.exercise.videoLink = this.data.videoLink;
    this.exercise.exerciseType = this.data.exerciseType;

    this.dataService.addExercise(this.exercise).subscribe(data => {
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

  buildForm(): void {
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

