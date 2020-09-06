import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Instruction} from '../../../../../../../_models/instruction';

@Component({
  selector: 'app-instruction-preview',
  templateUrl: './instruction-preview.component.html',
  styleUrls: ['./instruction-preview.component.css']
})
export class InstructionPreviewComponent implements OnInit {

  instructions: Instruction[] = [];
  constructor(public dialogRef: MatDialogRef<InstructionPreviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.instructions.push(this.data.instruction);
  }

}
