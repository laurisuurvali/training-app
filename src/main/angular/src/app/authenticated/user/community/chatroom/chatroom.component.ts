import {AfterViewChecked, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements AfterViewChecked {
  @ViewChild('scroller', {static: false}) private feedWrapper: ElementRef;

  constructor() {
  }

  ngAfterViewChecked(): void {
    this.scrollBottom();
  }

  scrollBottom(): void {
    const div = this.feedWrapper.nativeElement;
    div.scrollTop = div.scrollHeight;
  }
}
