import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';

SwiperCore.use([Pagination/*,Autoplay, Keyboard, , Scrollbar, Zoom/*/]);

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IntroPage implements OnInit {
  slideOps={
    initialSlide:0,
    slidesPresView:1,
    centeredSlides:true,
    speed:400
  }
  slides =[
    {
      imageSrc:"assets/img/logo.png",
      imageAlt:"Logo app music",
      title: "Listen you music",
      subtitle:"In anywhere",
      description:"The best music aviable, listen in anywhere anytime.",
      icon:"play"
    },
    {
      imageSrc:"assets/img/logo.png",
      imageAlt:"Logo app music",
      title: "Listen you music",
      subtitle:"In anywhere",
      description:"The best music aviable, listen in anywhere anytime.",
      icon:"play"
    },
    {
      imageSrc:"assets/img/logo.png",
      imageAlt:"Logo app music",
      title: "Listen you music",
      subtitle:"In anywhere",
      description:"The best music aviable, listen in anywhere anytime.",
      icon:"play"
    }
  ]
  constructor(private router:Router, private storage:Storage) { }
  finish(){
    
     this.storage.set("isIntroShowed",true);
    this.router.navigateByUrl('/home');
  }
  async ngOnInit() {
    await this.storage.create();
  }



}
