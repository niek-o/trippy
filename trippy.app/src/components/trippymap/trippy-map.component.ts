import { Component, input, signal } from '@angular/core';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';
import maplibregl, { LngLatLike, Map } from 'maplibre-gl';
import { environment } from '../../environments/environment';

@Component({
  selector: 'trippy-map',
  imports: [MapComponent],
  templateUrl: 'trippy-map.component.html'
})
export class TrippyMap {
  startCoordinates = input<LngLatLike>();

  protected readonly map = signal<Map>(null!);

  async addRoute(stops: TripStop[]) {
    try {
      this.map().removeSource('route');
      this.map().removeLayer('route-line');
    } catch (e) {
      console.warn("Failed to remove existing routes")
    }

    const stopCoordinates = await this.getCoordinatesForStops(stops);

    if (stopCoordinates.length === 0) {
      return;
    }

    const route = await this.getRouteForCoordinates(stopCoordinates);

    this.map().addSource('route', { type: 'geojson', data: route });

    this.map().addLayer({
      id: 'route-line',
      type: 'line',
      source: 'route',
      paint: {
        'line-color': getComputedStyle(document.documentElement).getPropertyValue('--p-primary-500'),
        'line-width': 5
      }
    });

    const bounds = stopCoordinates.reduce(
      (bounds, coord) => bounds.extend(coord),
      new maplibregl.LngLatBounds(stopCoordinates[0], stopCoordinates[0])
    );

    this.map().fitBounds(bounds, {
      padding: 300,
      duration: 2000
    });
  }

  private async getCoordinatesForAddress(address: string): Promise<[number, number]> {
    const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=jsonv2&limit=1`;
    const res = await fetch(url);
    const json = await res.json();

    if (!json || json.length === 0) {
      throw new Error('Address not found');
    }

    return [
      Number.parseFloat(json[0].lon),
      Number.parseFloat(json[0].lat)
    ];
  }

  private async getRouteForCoordinates(stopCoordinates: LngLatLike[]) {
    const url = `https://router.project-osrm.org/route/v1/driving/${stopCoordinates.join(';')}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    const json = await res.json();

    return json.routes[0].geometry;
  }

  private async getCoordinatesForStops(stops: TripStop[]): Promise<LngLatLike[]> {
    return await Promise.all(stops
      .filter(stop => stop.searchQuery !== '')
      .map(async (stop) => {
        return await this.getCoordinatesForAddress(stop.searchQuery);
      }));
  }

  onMapLoad(map: Map) {
    this.map.set(map);
  }

  protected readonly environment = environment;
}
