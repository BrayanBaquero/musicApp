import { Component , ViewEncapsulation} from '@angular/core';
import { ModalController } from '@ionic/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { AppMusicService } from '../services/app-music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

SwiperCore.use([Pagination/*,Autoplay, Keyboard, , Scrollbar, Zoom/*/]);


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage {
  slideOps={
    initialSlide:2,
    slidesPerView:4,
    centeredSlides:true,
    speed:400
   
  }



  songs:any[]=[];
  albums:any[]=[];
  artists:any[]=[];

  constructor(private musicService: AppMusicService,
              private modalController: ModalController ) {}

  ionViewDidEnter(){
    this.musicService.getNewReleases().then((newReleases)=>{
      this.artists=this.musicService.getArtists().items;
      //console.log('Artistas',this.artists)
      this.songs=newReleases.albums.items.filter(e=>e.album_type=="single");
      this.albums=newReleases.albums.items.filter(e=>e.album_type=="album");
      //console.log(this.artists);
    })
  }

  async showSongs(artist){
    const songs=await this.musicService.getArtistsTopTracks(artist.id);
    const modal=await this.modalController.create({
      component: SongsModalPage,
      componentProps:{
        songs:songs.tracks,
        artist: artist.name
      }
    });
    return await modal.present();
  }
}
