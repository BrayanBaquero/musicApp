import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private storage:Storage) {
    this.storage.create();
   }

  async loginUser(credential){
    const credentialSaved=await this.storage.get('user');
    return new Promise((accept,reject)=>{
     
      if(credential.email==credentialSaved.email && btoa(credential.password)==credentialSaved.password){
        accept("Login correct")
      }else {
        reject("login wrong")
      }
    });
  }

  registerUser(userData){
    userData.password=btoa(userData.password);
    return this.storage.set('user',userData);
  }
}
