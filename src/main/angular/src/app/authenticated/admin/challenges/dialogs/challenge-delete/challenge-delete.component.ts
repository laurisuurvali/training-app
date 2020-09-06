import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ChallengeService} from '../../../../../_services/admin/challenge.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-challenge-delete',
  templateUrl: './challenge-delete.component.html',
  styleUrls: ['./challenge-delete.component.css']
})
export class ChallengeDeleteComponent {

  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<ChallengeDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: ChallengeService,
              private snackBar: MatSnackBar) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteChallenge(this.data.challengeId).subscribe(data => {
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
