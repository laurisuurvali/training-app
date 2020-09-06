import {Challenge} from './challenge';
import {User} from './user';

export class Subscription {
  subscriptionId: number;
  startDate: Date;
  challenge?: Challenge;
  users?: User[];
}
