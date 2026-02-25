import { Injectable, signal } from '@angular/core';
import { addStopEvent } from './events/add-stop.event';
import { removeStopEvent } from './events/remove-stop.event';
import { updateStopEvent } from './events/update-stop.event';
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

  public updateStop(event: updateStopEvent): void {
    this.stops.update(stops =>
      stops.map((stop, i) => i === event.index ? { ...stop, searchQuery: event.value } : stop)
    );
  }

  public addStop(event: addStopEvent): void {
    this.stops.update(stops => {
      const updated = [...stops];
      updated.splice(event.index, 0, { searchQuery: '', colour: '--p-blue-500' });
      return updated;
    });
  }

  public removeStop(event: removeStopEvent): void {
    this.stops.update(stops => {
      const updated = [...stops];
      updated.splice(event.index, 1);
      return updated;
    });
  }
}
