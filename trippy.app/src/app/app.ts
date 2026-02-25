import { Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LngLatLike } from 'maplibre-gl';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { RoutePlannerCard } from '../components/route-planner-card/route-planner-card.component';
import { TrippyMap } from '../components/trippy-map/trippy-map.component';
import { AddStopEvent } from '../utils/stop-manager/events/add-stop.event';
import { RemoveStopEvent } from '../utils/stop-manager/events/remove-stop.event';
import { UpdateStopEvent } from '../utils/stop-manager/events/update-stop.event';
import { StopManager } from '../utils/stop-manager/stop-manager';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, FormsModule, TrippyMap, SkeletonModule, RoutePlannerCard],
  templateUrl: './app.html'
})
export class App implements OnInit {
  async ngOnInit() {
    const coords = await this.getCurrentPosition();

    this.startCoordinates.set(coords);
  }

  private readonly stopManager = inject(StopManager);

  readonly stops = this.stopManager.stops;

  @ViewChild(TrippyMap) map: TrippyMap;
  @ViewChild(RoutePlannerCard) routePlanner: RoutePlannerCard;

  async getCurrentPosition(): Promise<LngLatLike | null> {
    try {
      const position = await new Promise<GeolocationCoordinates>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          (err) => reject(new Error(err.message))
        )
      );

      return [position.longitude, position.latitude];
    } catch (err) {
      console.error(err);
      return [0, 0];
    }
  }

  protected readonly startCoordinates = signal<LngLatLike | null>(null);
  protected readonly startCoordinatesReady = computed(() => this.startCoordinates() !== null);

  addRouteToMap() {
    this.map.addRoute(this.stops());
  }

  addStop(event: AddStopEvent) {
    this.stopManager.addStop(event);
  }

  removeStop(event: RemoveStopEvent) {
    this.stopManager.removeStop(event);
  }

  updateStop(event: UpdateStopEvent) {
    this.stopManager.updateStop(event);
  }
}
