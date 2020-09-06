import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Instruction} from '../../../../../../../_models/instruction';
import {InstructionType} from '../../../../../../../_models/instruction-type';
import {MediaType} from '../../../../../../../_models/media-type';
import {InstructionService} from '../../../../../../../_services/admin/instruction.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-instruction-edit',
  templateUrl: './instruction-edit.component.html',
  styleUrls: ['./instruction-edit.component.css']
})
export class InstructionEditComponent implements OnInit {

  instructionForm: FormGroup;
  instruction: Instruction = new Instruction();
  mediaTypes = Object.values(MediaType);
  instructionTypes = Object.values(InstructionType);
  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<InstructionEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: InstructionService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.setInstructionFormValidators();
  }

  buildForm(): void {
    this.instructionForm = this.fb.group({
      instructionType: ['', [Validators.required]],
      stepCount: ['', ],
      instructionBody: ['', ],
      mediaType: ['', ],
      mediaLink: ['', ]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
  }

  public stopEdit(): void {
    this.dataService.updateInstruction(this.data).subscribe(data => {
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

  setInstructionFormValidators(): void {
    const mediaLinkControl = this.instructionForm.get('mediaLink');
    const stepCountControl = this.instructionForm.get('stepCount');

    this.instructionForm.get('mediaType').valueChanges
      .subscribe(mediaType => {

        if (mediaType !== 'NONE') {
          mediaLinkControl.enable();
          mediaLinkControl.setValidators([Validators.required]);
        }

        if (mediaType === 'NONE') {
          mediaLinkControl.setValue('');
          mediaLinkControl.disable();
          mediaLinkControl.setValidators(null);
        }
        mediaLinkControl.updateValueAndValidity();
      });

    this.instructionForm.get('instructionType').valueChanges
      .subscribe(instructionType => {
        if (instructionType === 'MEAL') {
          stepCountControl.setValue('');
          stepCountControl.disable();
        }

        if (instructionType === 'EXERCISE') {
          stepCountControl.enable();
        }
      });
  }
}
