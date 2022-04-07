import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {CameraResultType ,CameraSource,Camera} from '@capacitor/camera'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  userImage="assets/img/user.jpg";
  photo: SafeResourceUrl;
  constructor(private sanitize: DomSanitizer) { }

  ngOnInit() {
  }

  async takePhoto(){
    const image=await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source:CameraSource.Camera
    });
    this.photo=this.sanitize.bypassSecurityTrustResourceUrl(image && image.dataUrl);
    console.log(image);
  }

}
