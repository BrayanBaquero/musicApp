import { Component , ViewEncapsulation} from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';

SwiperCore.use([Pagination/*,Autoplay, Keyboard, , Scrollbar, Zoom/*/]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage {

  constructor() {}

  slideOps={
    initialSlide:0,
    slidesPresView:1,
    centeredSlides:true,
    speed:400
  }

}
