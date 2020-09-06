import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../../_services/security/token-storage.service';
import {Post} from '../model/post';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() post: Post;
  userUsername: string;
  userFirstName: string;
  userLastName: string;
  content: string;
  timeSent: string;
  isOwnMessage: boolean;
  ownUsername: string;

  constructor(private tokenService: TokenStorageService) {
  }

  ngOnInit(post = this.post): void {
    this.content = post.content;
    this.timeSent = post.timeSent.toLocaleString();
    this.userUsername = post.userUsername;
    this.userFirstName = post.userFirstName;
    this.userLastName = post.userLastName;

    this.ownUsername = this.tokenService.getUser().sub;
    this.isOwnMessage = this.ownUsername === this.userUsername;
  }
}
