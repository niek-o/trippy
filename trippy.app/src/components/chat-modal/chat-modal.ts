import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ChatMessageModel } from '../../utils/chat-manager/chat-message.model';
import { RouteSuggestionRequestModel } from '../../utils/route-suggestion-api-client/route-suggestion-request.model';
import { ChatModalMessage } from './chat-modal-message/chat-modal-message';

@Component({
  selector: 'chat-modal',
  imports: [
    ChatModalMessage,
    Dialog
  ],
  templateUrl: './chat-modal.html'
})
export class ChatModal {

  @Input() visible: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();

  isLastInGroup(index: number): boolean {
    const current = this.chatMessages()[index];
    const next = this.chatMessages()[index + 1];
    return current.sender === 'Trippy' && (!next || next.sender !== 'Trippy');
  }

  readonly request = signal<RouteSuggestionRequestModel>({
    startingPoint: 'Amsterdam',
    finishingPoint: 'Amsterdam',
    wouldLikeToSee: ['Alps', 'Mountains'],
    amountOfDays: 10,
    drivingTimePerDayInHours: 6
  });

  readonly chatMessages = signal<ChatMessageModel[]>([
    {
      sender: 'Trippy',
      message: 'Hello! I am Trippy, and I will help you find the perfect road trip for you!',
      type: 'String'
    },
    {
      sender: 'Trippy',
      message: 'What would you like to start your road trip?',
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
      message: 'Where would you like to see during your road trip?',
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
}
