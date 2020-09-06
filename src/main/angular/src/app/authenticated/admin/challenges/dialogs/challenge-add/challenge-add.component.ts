import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Challenge} from '../../../../../_models/challenge';
import {ChallengeService} from '../../../../../_services/admin/challenge.service';
import {ChallengeEditComponent} from '../challenge-edit/challenge-edit.component';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-challenge-add',
  templateUrl: './challenge-add.component.html',
  styleUrls: ['./challenge-add.component.css']
})
export class ChallengeAddComponent implements OnInit {

  challengeForm: FormGroup;
  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<ChallengeAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Challenge,
              public dataService: ChallengeService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.challengeForm = this.fb.group({
      challengeName: ['', Validators.required],
      weekQuantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  submit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dataService.addChallenge(this.data).subscribe(data => {
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
