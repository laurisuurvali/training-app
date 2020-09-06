import {Component, OnInit} from '@angular/core';
import {StompState} from '@stomp/ng2-stompjs';

import {Message} from '@stomp/stompjs';
import {TokenStorageService} from '../../../../_services/security/token-storage.service';
import {MessagingService} from '../../../../_services/user/messaging.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  private messagingService: MessagingService;
  feed = [];
  state = 'NOT CONNECTED';

  constructor(private tokenStorage: TokenStorageService) {
    this.messagingService = new MessagingService(tokenStorage);
    this.messagingService.allHistoryMessagesStream().subscribe((message: Message) => {
      this.feed = JSON.parse(message.body);
    });
    this.messagingService.state().subscribe((state: StompState) => {
      this.state = StompState[state];
    });
  }
  ngOnInit(): void {
    this.messagingService.oneMessageStream().subscribe((message: Message) => {
      this.feed.push(JSON.parse(message.body));
    });
  }
}
