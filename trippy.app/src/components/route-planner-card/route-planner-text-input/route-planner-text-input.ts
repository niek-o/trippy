import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-route-planner-text-input',
  imports: [InputGroupAddon, Button, InputGroup, FormsModule, InputTextModule],
  templateUrl: './route-planner-text-input.html'
})
export class RoutePlannerTextInput {
  index = input.required<number>();
  count = input.required<number>();
  value = model<string>('');

  removeStop = output<number>();
}
