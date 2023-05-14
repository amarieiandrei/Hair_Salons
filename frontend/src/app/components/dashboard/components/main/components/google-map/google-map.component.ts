import { Component } from "@angular/core";

@Component({
  selector: "app-google-map",
  templateUrl: "./google-map.component.html",
})
export class GoogleMapComponent {
  // * Fields
  public markerOptions: google.maps.MarkerOptions = { draggable: false };
  public markerPositions: google.maps.LatLngLiteral[] = [];

  public display: any;
  public center: google.maps.LatLngLiteral = { lat: 45.5, lng: 25 };
  public zoom: number = 7;

  constructor() {}

  public move = (event: google.maps.MapMouseEvent) => {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  };

  public addMarker = (event: google.maps.MapMouseEvent) => {
    if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  };
}
