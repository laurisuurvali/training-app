import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Exercise} from '../../../../_models/exercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {

  @Input() marginLeftTopRight: number;
  @Input() marginBottom: number;
  @Input() exercises: Exercise[] = [];

  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

  }
}
