import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor() { }
  displayMap(latitude, longitude):any {
    let map = new (window['mappls']).Map('map', {
        center: { lat: latitude, lng: longitude },
        fullscreenControl: false,
        zoomControl: true
    });
    return map;
  }  
}
