import { Injectable } from '@angular/core';
import * as dataArtists from "./artists.json";

@Injectable({
  providedIn: 'root'
})
export class AppMusicService {

  constructor() { }

  getArtists(){
    return dataArtists;
  }
  getNewReleases(){
    return fetch("https://platzi-music-api.herokuapp.com/browse/new-releases").then(response=>response.json());
  }

  getArtistsTopTracks(artistId){
    return fetch(`https://platzi-music-api.herokuapp.com/artists/${artistId}/top-tracks?country=CO`).then(response=>response.json());

  }
}
