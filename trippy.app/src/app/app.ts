import { Component, computed, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LngLatLike } from 'maplibre-gl';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { RoutePlannerCard } from '../components/routeplanner-card/route-planner-card.component';
import { TrippyMap } from '../components/trippymap/trippy-map.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, FormsModule, TrippyMap, SkeletonModule],
  templateUrl: './app.html'
})
export class App implements OnInit {
  async ngOnInit() {
    const coords = await this.getCurrentPosition();

    this.startCoordinates.set(coords);
  }

  @ViewChild(TrippyMap) map: TrippyMap;
  @ViewChild(RoutePlannerCard) routePlanner: RoutePlannerCard;

  async getCurrentPosition(): Promise<LngLatLike | null> {
    try {
      const position = await new Promise<GeolocationCoordinates>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          (err) => reject(err)
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
    this.map.addRoute(this.routePlanner.stops());
  }
}
