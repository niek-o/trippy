import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { AddStopEvent } from '../../utils/stop-manager/events/add-stop.event';
import { RemoveStopEvent } from '../../utils/stop-manager/events/remove-stop.event';
import { UpdateStopEvent } from '../../utils/stop-manager/events/update-stop.event';
import { TripStopModel } from '../../utils/stop-manager/trip-stop.model';
import { RoutePlannerAddStopBar } from './route-planner-add-stop-bar/route-planner-add-stop-bar';
import { RoutePlannerTextInput } from './route-planner-text-input/route-planner-text-input';

@Component({
  selector: 'routeplannercard',
  imports: [InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, FormsModule, Card, RoutePlannerTextInput, RoutePlannerAddStopBar],
  templateUrl: './route-planner-card.component.html'
})
export class RoutePlannerCard {
  readonly stops = input.required<TripStopModel[]>();

  @Output() planRoute: EventEmitter<void> = new EventEmitter();
  @Output() updateStop: EventEmitter<UpdateStopEvent> = new EventEmitter();
  @Output() addStop: EventEmitter<AddStopEvent> = new EventEmitter();
  @Output() removeStop: EventEmitter<RemoveStopEvent> = new EventEmitter();
}
