import { Component, effect, EventEmitter, inject, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ChatManager } from '../../utils/chat-manager/chat-manager';
import { ChatModalMessage } from './chat-modal-message/chat-modal-message';
import { ChatModalPreferenceTag } from './chat-modal-preference-tag/chat-modal-preference-tag';

@Component({
  selector: 'chat-modal',
  imports: [
    ChatModalMessage,
    Dialog,
    InputTextModule,
    Button,
    FormsModule,
    ChatModalPreferenceTag
  ],
  templateUrl: './chat-modal.html'
})
export class ChatModal {
  readonly visible = input<boolean>(false);
  @Output() visibleChange = new EventEmitter<boolean>();

  chatManager = inject(ChatManager);

  constructor() {
    effect(() => {
      if (this.visible()) {
        this.chatManager.reset();
        setTimeout(() => this.chatManager.advance(), 800);
      }
    });
  }
}
