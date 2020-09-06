import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Exercise} from '../../../_models/exercise';
import {Instruction} from '../../../_models/instruction';
import {TokenStorageService} from '../../../_services/security/token-storage.service';
import {UserExerciseService} from '../../../_services/user/user-exercise.service';
import {UserInstructionService} from '../../../_services/user/user-instruction.service';
import {UserSubscriptionService} from '../../../_services/user/user-subscription.service';
import {Day} from '../nutrition/nutrition.component';

@Component({
  selector: 'app-trainings',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  @Input()
  videoLink = 'https://player.vimeo.com/video/311844937';
  videoLinkSRU: SafeResourceUrl;

  subscriptionId: number;

  currentWeekExercises: Exercise[] = [];
  selectedDayExercises: Exercise[] = [];
  currentWeekInstructions: Instruction[] = [];
  selectedDayInstructions: Instruction[] = [];
  currentWeekDayNumberId: number;
  selectWeekDayNumberId: number;
  selectExerciseType: string;

  currentWeekday: string;
  currentDate: Date;
  weekdaysInEstonian: string[] = ['Pühapäev',
                                  'Esmaspäev',
                                  'Teisipäev',
                                  'Kolmapäev',
                                  'Neljapäev',
                                  'Reede',
                                  'Laupäev'];
  days: Day[] = [
    {value: '1', viewValue: 'Päev 1'},
    {value: '2', viewValue: 'Päev 2'},
    {value: '3', viewValue: 'Päev 3'},
    {value: '4', viewValue: 'Päev 4'},
    {value: '5', viewValue: 'Päev 5'},
    {value: '6', viewValue: 'Päev 6'},
    {value: '7', viewValue: 'Päev 7'},
  ];
  exerciseTypeSelect: ExerciseTypeSelect[] = [
    {value: 'GYM', viewValue: 'Jõusaal'},
    {value: 'HOME', viewValue: 'Kodu'}
  ];

  exerciseTypeFilter = new FormControl('');
  dayFilter = new FormControl('');


  constructor(public sanitizer: DomSanitizer,
              private userExerciseService: UserExerciseService,
              private tokenStorage: TokenStorageService,
              private userSubscriptionService: UserSubscriptionService,
              private userInstructionService: UserInstructionService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.subscriptionId = this.tokenStorage.getTokenPayLoad().subscriptionId;
    }
    this.selectExerciseType = 'GYM';
    this.exerciseTypeFilter.setValue(this.selectExerciseType);
    this.userSubscriptionService.getCurrentSubscriptionWeekDayNumber().subscribe(result => {
      this.currentWeekDayNumberId = result;
      this.selectWeekDayNumberId = this.currentWeekDayNumberId;
      this.dayFilter.setValue(this.selectWeekDayNumberId.toString());
    });

    this.userExerciseService.getCurrentWeekExercises().subscribe(result => {
      this.currentWeekExercises = result;
      this.selectedDayExercises = this.getSelectedExercises(this.selectWeekDayNumberId, this.selectExerciseType);
      this.currentWeekday = this.weekdaysInEstonian[new Date().getDay()];
      this.currentDate = new Date();
      let i;
      for (i = 0; i < this.currentWeekExercises.length; i++){
          this.currentWeekExercises[i].videoLinkSRU = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentWeekExercises[i].videoLink);
      }
    });


    this.userInstructionService.getCurrentWeekExerciseInstructions().subscribe(result => {
      this.currentWeekInstructions = result;
      let i;
      for (i = 0; i < this.currentWeekInstructions.length; i++){
        this.currentWeekInstructions[i].mediaLinkSRU = this.sanitizer
          .bypassSecurityTrustResourceUrl(this.currentWeekInstructions[i].mediaLink);
      }
      this.selectedDayInstructions = this.getSelectedInstructions(this.selectWeekDayNumberId);
    });

    this.dayFilter.valueChanges
      .subscribe(
        day => {
          this.selectWeekDayNumberId = parseInt(day, 10);
          this.selectedDayExercises = this.getSelectedExercises(this.selectWeekDayNumberId, this.selectExerciseType);
          this.selectedDayInstructions = this.getSelectedInstructions(this.selectWeekDayNumberId);
        }
      );
    this.exerciseTypeFilter.valueChanges
      .subscribe(
        exerciseType => {
          this.selectExerciseType = exerciseType;
          this.selectedDayExercises = this.getSelectedExercises(this.selectWeekDayNumberId, this.selectExerciseType);
        }
      );
  }
  getSelectedExercises(dayNumberId: number, exerciseType: string): Exercise[] {
    return this.currentWeekExercises.filter(exercise =>
      exercise.challengeDay.id.dayNumberId === dayNumberId && exercise.exerciseType === exerciseType ||
      exercise.challengeDay.id.dayNumberId === dayNumberId && exercise.exerciseType === 'UNIVERSAL')
      .sort((a, b) => (a.orderNumber) - (b.orderNumber));
  }

  getSelectedInstructions(dayNumberId: number): Instruction[] {
    return this.currentWeekInstructions.filter(instruction =>
      instruction.challengeDay.id.dayNumberId === dayNumberId)
      .sort((a, b) => (a.instructionId) - (b.instructionId));
  }
}
export interface ExerciseTypeSelect {
  value: string;
  viewValue: string;
}
