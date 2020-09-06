export class Post {
  id?: number;
  content: string;
  userUsername?: string;
  userFirstName?: string;
  userLastName?: string;
  timeSent?: Date = new Date();
}
