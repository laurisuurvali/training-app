import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {InstructionService} from '../../../../../../../_services/admin/instruction.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-instruction-delete',
  templateUrl: './instruction-delete.component.html',
  styleUrls: ['./instruction-delete.component.css']
})
export class InstructionDeleteComponent {

  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<InstructionDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: InstructionService,
              private snackBar: MatSnackBar) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteInstruction(this.data.instructionId).subscribe(data => {
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
