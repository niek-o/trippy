import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { RoutePlannerAddStopBar } from './route-planner-add-stop-bar/route-planner-add-stop-bar';
import { RoutePlannerTextInput } from './route-planner-text-input/route-planner-text-input';

@Component({
  selector: 'routeplannercard',
  imports: [InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, FormsModule, Card, RoutePlannerTextInput, RoutePlannerAddStopBar],
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

  updateStop(index: number, value: string) {
    this.stops.update(stops =>
      stops.map((stop, i) => i === index ? { ...stop, searchQuery: value } : stop)
    );
  }

  addStop(index: number) {
    this.stops.update(stops => {
      const updated = [...stops];
      updated.splice(index, 0, { searchQuery: '' });
      return updated;
    });
  }

  removeStop(index: number) {
    this.stops.update(stops => stops.filter((_, i) => i !== index));
  }

  @Output() planRoute: EventEmitter<void> = new EventEmitter();
}
