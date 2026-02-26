import { Component, inject, input } from '@angular/core';
import { ChatManager } from '../../../utils/chat-manager/chat-manager';
import { ChatMessageModel } from '../../../utils/chat-manager/chat-message.model';
import { ChatModalPreferenceTag } from '../chat-modal-preference-tag/chat-modal-preference-tag';

interface WouldLikeToSeeTag {
  text: string;
  emoji?: string;
  image?: string;
}

@Component({
  selector: 'chat-modal-message',
  imports: [
    ChatModalPreferenceTag
  ],
  templateUrl: './chat-modal-message.html'
})
export class ChatModalMessage {
  readonly chatMessage = input.required<ChatMessageModel>();
  readonly isLastInGroup = input.required<boolean>();

  chatManager = inject(ChatManager);

  isActiveTag(message: ChatMessageModel, tag: WouldLikeToSeeTag) {
    if (message.type !== 'Tags') {
      return false;
    }

    return message.data.includes(tag.text);
  }
}
