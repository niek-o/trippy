import { computed, Injectable, signal } from '@angular/core';
import { RouteSuggestionRequestModel } from '../route-suggestion-api-client/route-suggestion-request.model';
import { ChatMessageModel, ChatMessageModelWithTags } from './chat-message.model';

interface WouldLikeToSeeTag {
  text: string;
  emoji?: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class ChatManager {
  isLastInGroup(index: number): boolean {
    const current = this.chatMessages()[index];
    const next = this.chatMessages()[index + 1];
    return current.sender === 'Trippy' && next?.sender !== 'Trippy';
  }

  isTagSelected(tag: string): boolean {
    return this.selectedTags().includes(tag);
  }

  currentIndex = signal(0);
  userInput = signal('');
  visibleMessages = computed(() => {
    const messages = this.chatMessages().slice(0, this.currentIndex() + 1);
    if (this.awaitingInput()) {
      return messages.slice(0, -1);
    }
    return messages;
  });

  selectedTags = signal<string[]>([]);

  toggleTag(tag: string) {
    this.selectedTags.update(tags =>
      tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag]
    );
  }

  reset() {
    this.currentIndex.set(0);
    this.userInput.set('');
    this.selectedTags.set([]);
  }

  submitUserInput() {
    const index = this.currentIndex();
    const tags = this.selectedTags();
    const input = this.userInput();

    switch (index) {
      case 2:
        this.request.update(r => ({ ...r, startingPoint: this.userInput() }));
        break;
      case 4:
        this.request.update(r => ({ ...r, finishingPoint: this.userInput() }));
        break;
      case 6:
        this.request.update(r => ({ ...r, wouldLikeToSee: tags }));
        break;
      case 8:
        this.request.update(r => ({ ...r, amountOfDays: parseInt(this.userInput()) }));
        break;
      case 10:
        this.request.update(r => ({ ...r, drivingTimePerDayInHours: parseInt(this.userInput()) }));
        break;
    }

    this.userInput.set('');
    this.advance();

    this.chatMessages.update(messages => {
      const updated = [...messages];
      if (index === 6) {
        updated[index] = {
          sender: 'User',
          type: 'Tags',
          message: 'none',
          data: tags
        } as ChatMessageModelWithTags;
      }
      else {
        updated[index] = {
          ...updated[index],
          message: input
        };
      }
      return updated;
    });
  }

  advance() {
    const next = this.currentIndex() + 1;
    if (next < this.chatMessages().length) {
      this.currentIndex.set(next);

      const nextMsg = this.chatMessages()[next];
      if (nextMsg.sender === 'Trippy') {
        setTimeout(() => this.advance(), 800);
      }
    }
  }

  awaitingInput = computed(() => {
    const current = this.chatMessages()[this.currentIndex()];
    return current?.sender === 'User';
  });

  readonly request = signal<RouteSuggestionRequestModel>({
    startingPoint: '',
    finishingPoint: '',
    wouldLikeToSee: [],
    amountOfDays: 0,
    drivingTimePerDayInHours: 0
  });

  readonly chatMessages = signal<ChatMessageModel[]>([
    {
      sender: 'Trippy',
      message: 'Hello! I am Trippy, and I will help you find the perfect road trip for you!',
      type: 'String'
    },
    {
      sender: 'Trippy',
      message: 'Where would you like to start your road trip?',
      type: 'String'
    },
    {
      sender: 'User',
      message: this.request().startingPoint,
      type: 'String'
    },
    {
      sender: 'Trippy',
      message: 'Where would you like to end your road trip?',
      type: 'String'
    },
    {
      sender: 'User',
      message: this.request().finishingPoint,
      type: 'String'
    },
    {
      sender: 'Trippy',
      message: 'What would you like to see during your road trip?',
      type: 'String'
    },
    {
      sender: 'User',
      message: 'none',
      type: 'Tags',
      data: this.request().wouldLikeToSee
    },
    {
      sender: 'Trippy',
      message: 'How many days would you like to travel?',
      type: 'String'
    },
    {
      sender: 'User',
      message: this.request().amountOfDays.toString() + ' days',
      type: 'String'
    },
    {
      sender: 'Trippy',
      message: 'How many hours would you like to drive per day on average?',
      type: 'String'
    },
    {
      sender: 'User',
      message: this.request().drivingTimePerDayInHours.toString() + ' hours',
      type: 'String'
    },
    {
      sender: 'Trippy',
      message: 'Thank you! Our hard working planners are going to figure a route that suits your wishes!',
      type: 'String'
    }
  ]);

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
}
