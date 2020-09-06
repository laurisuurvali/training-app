import {ChallengeDay} from './challenge-day';
import {MediaType} from './media-type';
import {InstructionType} from './instruction-type';

export class Instruction {
  instructionId: number;
  instructionType: InstructionType;
  stepCount: string;
  instructionBody: string;
  challengeDay: ChallengeDay;
  mediaLink: string;
  mediaType: MediaType;
  mediaLinkSRU: any;
}
