import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { environment } from 'src/environments/environment';
import { Geolocation } from "@capacitor/geolocation";

@Component({
  selector: 'app-sports',
  templateUrl: './sports.page.html',
  styleUrls: ['./sports.page.scss'],
})
export class SportsPage implements  OnDestroy{
  map: Leaflet.Map;
  LeafIcon = Leaflet.Icon.extend({
      options: {
        iconSize:     [38, 38],
        //shadowSize:   [50, 64],
        //iconAnchor:   [22, 94],
        //shadowAnchor: [4, 62],
        //popupAnchor:  [-3, -76]
      }
  });

  greenIcon = new this.LeafIcon({
    iconUrl: 'https://measesoran.com/wp-content/uploads/2016/11/icono-online.png',
    imagePath: 'assets/img/bicycle.png'
    //shadowUrl: 'https://measesoran.com/wp-content/uploads/2016/11/icono-online.png'
  });

  marker:any;
  currentCenter:any={};
  coordinates:any[]=[];
  defaultZoom=14;
  constructor() { }

 
  ionViewDidEnter() { 
    this.getCurrentPosition().then(succ=>{
      this.leafletMap(); 
    //  this.map.marker([ this.currentCenter.lat,this.currentCenter.lng], {icon: this.greenIcon}).addTo(this.map);
    });

    this.watchPosition();
    
  }

  leafletMap() {
    this.map=Leaflet.map('mapId',{
      center:[
        this.currentCenter.lat, 
        this.currentCenter.lng,
      ],
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
    }).addTo(this.map);

    const myicon=Leaflet.divIcon({className: 'my-div-icon'});
    this.marker=Leaflet.marker([ this.currentCenter.lat,this.currentCenter.lng], {icon: myicon}).addTo(this.map);
    
    setTimeout(()=>{
      this.map.invalidateSize();
      
    },0)
  
  }

  async getCurrentPosition() {
    const coordinates=await Geolocation.getCurrentPosition();
    this.currentCenter={
      lat: coordinates.coords.latitude,
      lng:coordinates.coords.longitude
    }
  }

  watchPosition(){
    Geolocation.watchPosition({},position=>{
      this.currentCenter={
        lat: position.coords.latitude,
        lng:position.coords.longitude
      }
      this.map.setView([this.currentCenter.lat, 
                       this.currentCenter.lng,], 
                       this.defaultZoom);
      this.refreshIcon();
    })

  }

  refreshIcon(){

    this.marker.setLatLng(new Leaflet.LatLng(this.currentCenter.lat,this.currentCenter.lng))
    
  //this.map.addLayer(icon);
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

}
