import {ChallengeDay} from './challenge-day';
import {ExerciseType} from './exercise-type';

export class Exercise {
  exerciseId: number;
  exerciseName: string;
  orderNumber: number;
  description: string;
  reps: number;
  sets: number;
  exerciseBreak: number;
  exerciseType: ExerciseType;
  videoLink: string;
  challengeDay: ChallengeDay;
    videoLinkSRU: any;
}
