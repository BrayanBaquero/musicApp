import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.page.html',
  styleUrls: ['./sports.page.scss'],
})
export class SportsPage implements OnInit, OnDestroy{
  map: Leaflet.Map;
  constructor() { }

  ngOnInit() {this.leafletMap(); }
  ionViewDidEnter() { 
  //  this.leafletMap(); 
  }

  leafletMap() {
    this.map=Leaflet.map('mapId',{
      center:[28.644800, 77.216721],
      zoom:15,
      renderer:Leaflet.canvas()
    });
    //this.map = Leaflet.map('mapId').setView([28.644800, 77.216721], 5);

    Leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapAccessToken
    }).addTo(this.map)

    setTimeout(()=>{
      this.map.invalidateSize();
    },0)
  
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

}
