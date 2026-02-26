import { Component, input } from '@angular/core';
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

  readonly wouldLikeToSeeTags: WouldLikeToSeeTag[] = [
    {
      text: 'Mountains',
      emoji: '🏔️'
    },
    {
      text: 'Beaches',
      emoji: '🏖️'
    },
    {
      text: 'Sun',
      emoji: '☀️️'
    },
    {
      text: 'Twisty roads',
      emoji: '🔀'
    },
    {
      text: 'Italy',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/1280px-Flag_of_Italy.svg.png'
    },
    {
      text: 'Balkans',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Albania.svg/330px-Flag_of_Albania.svg.png'
    },
    {
      text: 'Alps',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/250px-Flag_of_Switzerland.svg.png'
    },
    {
      text: 'France',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/330px-Flag_of_France.svg.png'
    },
    {
      text: 'Scandinavia',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Norway.svg/330px-Flag_of_Norway.svg.png'
    },
    {
      text: 'Spain',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/330px-Flag_of_Spain.svg.png'
    }
  ];

  isActiveTag(message: ChatMessageModel, tag: WouldLikeToSeeTag) {
    if (message.type !== 'Tags') {
      return false;
    }

    return message.data.includes(tag.text);
  }
}
