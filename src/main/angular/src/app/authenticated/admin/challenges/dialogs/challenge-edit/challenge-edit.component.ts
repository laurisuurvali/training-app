import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Challenge} from '../../../../../_models/challenge';
import {ChallengeService} from '../../../../../_services/admin/challenge.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-challenge-edit',
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.css']
})
export class ChallengeEditComponent {

  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<ChallengeEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Challenge,
              public dataService: ChallengeService,
              private snackBar: MatSnackBar) { }

  formControl = new FormControl('', [
    Validators.required,
  ]);


  getErrorMessage(): string {
    return this.formControl.hasError('required') ? 'Nõutud väli' :
        '';
  }

  submit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.updateChallenge(this.data).subscribe(data => {
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

