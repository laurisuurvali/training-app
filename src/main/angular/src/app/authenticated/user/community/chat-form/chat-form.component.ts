import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../../_services/security/token-storage.service';
import {MessagingService} from '../../../../_services/user/messaging.service';
import {Post} from '../model/post';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent {
  newPost: Post = new Post();
  userUsername;
  constructor(private messageService: MessagingService,
              private tokenStorage: TokenStorageService) {
    this.userUsername = tokenStorage.getUser().sub;
  }

  chatForm = new FormGroup({
    message: new FormControl('', [
      Validators.required,
      Validators.maxLength(280)
    ]),
  });

  get message(): AbstractControl {
    return this.chatForm.get('message');
  }

  sendMessage(formDirective: FormGroupDirective): void {
    if (this.chatForm.invalid) {
      return;
    }
    this.newPost.content = this.chatForm.value.message;
    this.newPost.timeSent = new Date();
    this.messageService.send('/app/send/message', {...this.newPost, userUsername: this.userUsername});
    formDirective.resetForm();
    this.chatForm.reset();
  }
}
