import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-route-planner-add-stop-bar',
  imports: [],
  templateUrl: './route-planner-add-stop-bar.html'
})
export class RoutePlannerAddStopBar {
  index = input.required<number>();
  count = input.required<number>();

  addStop = output<number>();
}
