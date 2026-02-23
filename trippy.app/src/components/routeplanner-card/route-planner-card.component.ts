import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'routeplannercard',
  imports: [InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, FormsModule, Card],
  templateUrl: './route-planner-card.component.html'
})
export class RoutePlannerCard {
  readonly stops = signal([
    {
      searchQuery: ''
    },
    {
      searchQuery: ''
    }
  ]);

  addStop(index: number) {
    this.stops().splice(index, 0, { searchQuery: '' });
  }

  removeStop(index: number) {
    this.stops().splice(index, 1);
  }

  @Output() planRoute: EventEmitter<void> = new EventEmitter();
}
