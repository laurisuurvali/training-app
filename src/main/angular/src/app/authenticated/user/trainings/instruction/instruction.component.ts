import {Component, Input, OnInit} from '@angular/core';
import {Instruction} from '../../../../_models/instruction';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit {

  @Input() marginLeftTopRight: number;
  @Input() marginBottom: number;

  @Input() instructions: Instruction[] = [];
  constructor() { }

  ngOnInit(): void {

  }

}
