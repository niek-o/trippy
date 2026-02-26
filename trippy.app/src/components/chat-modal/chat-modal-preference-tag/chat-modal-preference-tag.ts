import { Component, input } from '@angular/core';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'chat-modal-preference-tag',
  imports: [
    Tag
  ],
  templateUrl: './chat-modal-preference-tag.html'
})
export class ChatModalPreferenceTag {
  readonly text = input.required<string>();
  readonly emoji = input<string>();
  readonly image = input<string>();
  readonly active = input.required<boolean>();
}
