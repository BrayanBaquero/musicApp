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
  song:any ={};
  currentSong:any={};
  newTime;

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

  async showSongs(artist,album){
    let songs;
    if(artist){
      songs=await this.musicService.getArtistsTopTracks(artist.id);
    }
    if(album){
      songs=await this.musicService.getAlbumTracks(album.id);
    }
    
    const modal=await this.modalController.create({
      component: SongsModalPage,
      componentProps:{
        songs: artist? songs.tracks :songs.items,
        artist: artist? artist.name :album.name
      }
    });

    modal.onDidDismiss().then(dataReturned=>{
      this.song=dataReturned.data;
      console.log(this.song);
    })
    return await modal.present();
  }

  play(){
    console.log(this.song)
    this.currentSong=new Audio (this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate",()=>{
      this.newTime=(this.currentSong.currentTime *(this.currentSong.duration/10))/100;
    })
    this.song.playing=true;
  }
  pause(){
    this.currentSong.pause();
    this.song.playing=false;
  }

  parseTime(time="1.00"){
    if(time){
      const parTime=parseInt(time.toString().split(".")[0],10);
      let minutes=Math.floor(parTime/60).toString();
      if(minutes.length==1){
        minutes="0"+minutes;
      }
      let second=(parTime%60).toString();
      return minutes + ":" + second;
    }
    return  "00:00";
  }
}
