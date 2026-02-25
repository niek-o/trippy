import { Injectable, signal } from '@angular/core';
import { AddStopEvent } from './events/add-stop.event';
import { RemoveStopEvent } from './events/remove-stop.event';
import { UpdateStopEvent } from './events/update-stop.event';
import { TripStopModel } from './trip-stop.model';

@Injectable({ providedIn: 'root' })
export class StopManager {
  public readonly stops = signal<TripStopModel[]>([
    {
      searchQuery: '',
      colour: '--p-green-500'
    },
    {
      searchQuery: '',
      colour: '--p-red-500'
    }
  ]);

  public updateStop(event: UpdateStopEvent): void {
    this.stops.update(stops =>
      stops.map((stop, i) => i === event.index ? { ...stop, searchQuery: event.value } : stop)
    );
  }

  public addStop(event: AddStopEvent): void {
    this.stops.update(stops => {
      const updated = [...stops];
      updated.splice(event.index, 0, { searchQuery: '', colour: '--p-blue-500' });
      return updated;
    });
  }

  public removeStop(event: RemoveStopEvent): void {
    this.stops.update(stops => {
      const updated = [...stops];
      updated.splice(event.index, 1);
      return updated;
    });
  }
}
