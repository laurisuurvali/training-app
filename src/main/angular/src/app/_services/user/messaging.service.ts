import {Injectable} from '@angular/core';
import {StompConfig, StompService, StompState} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {BehaviorSubject, Observable} from 'rxjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../../environments/environment';
import {TokenStorageService} from '../security/token-storage.service';

export function socketProvider(): SockJS {
  return new SockJS(`${environment.socketUrl}`);
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private readonly messagesHistory: Observable<Message>;
  private readonly message: Observable<Message>;
  private stompService: StompService;

  constructor(private tokenStorageService: TokenStorageService) {
    const stompConfig: StompConfig = {
      url: socketProvider,
      headers: {
        Authorization: 'Bearer ' + tokenStorageService.getToken(),
      },
      heartbeat_in: 0,
      heartbeat_out: 20000,
      reconnect_delay: 5000,
      debug: false
    };
    this.stompService = new StompService(stompConfig);
    this.messagesHistory = this.stompService.subscribe('/topic/messages');
    this.message = this.stompService.subscribe('/topic/message');
  }

  public allHistoryMessagesStream(): Observable<Message> {
    return this.messagesHistory;
  }

  public oneMessageStream(): Observable<Message> {
    return this.message;
  }

  public send(url: string, message: any): void {
    return this.stompService.publish(url, JSON.stringify(message));
  }

  public state(): BehaviorSubject<StompState> {
    return this.stompService.state;
  }
}
