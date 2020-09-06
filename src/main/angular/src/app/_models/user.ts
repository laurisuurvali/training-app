import {Status} from "tslint/lib/runner";

export class User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  roles?: string [];
  createdOn: Date;
  updatedOn: Date;
  subscriptionSubscriptionId: number;
  status: Status;
}
