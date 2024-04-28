import { Component, OnInit,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MapService } from '../map.service';

let map:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  constructor(@Inject(DOCUMENT) private document:Document,private mapService: MapService) {
  
  }
  ngOnInit() {
    map=this.mapService;
    begin();
  }
}
function begin() {
  if (window.sessionStorage.getItem("userLocation")) {
    // Use the stored location data if availablemapService
    let locvalue=window.sessionStorage.getItem("userLocation") as string;
    const locationData = JSON.parse(locvalue);
    map.displayMap(locationData.latitude, locationData.longitude);
} else {
    // Location data not found, request permission again
    getLocation();
}
}

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {

      alert("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
  sessionStorage.setItem("userLocation", JSON.stringify({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
  }));
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  map.displayMap(latitude, longitude);
}

function showError(error) {
  var errorMessage = "An error occurred: ";
  var permissionError = false;
  switch (error.code) {
      case error.PERMISSION_DENIED:
          map.displayMap(20.296059, 85.824539 );
          permissionError = true;
          break;
      case error.POSITION_UNAVAILABLE:
          errorMessage += "Location information is unavailable.";
          break;
      case error.TIMEOUT:
          errorMessage += "The request to get user location timed out.";
          break;
      default:
          errorMessage += "An unknown error occurred.";
  }
  if (!permissionError) {
      alert(errorMessage);
  }
}

