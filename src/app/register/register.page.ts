import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  validation_messages={
    nombre: [
      {type:"required", message:"El nombre es requerido"},
      {type:"pattern", message:"El nombre es invalido"}
    ],
    apellido: [
      {type:"required", message:"El apellido es requerido"},
      {type:"pattern", message:"El apellido es invalido"}
    ],
    email: [
      {type:"required", message:"El email es requerido"},
      {type:"pattern", message:"El email es invalido"}
    ],
    password:[
      {type:"required", message:"El password es requerido"},
      {type:"minlength", message:"El password debe contener mas de caracteres"}
    ]
  }

  errorMessage:string="";

  constructor(private formBuilder: FormBuilder,
             private authService: AuthenticateService,
             private navCtrl: NavController,
             private storage: Storage) { 
               
    this.registerForm=this.formBuilder.group({
      nombre:new FormControl("",Validators.compose([
        Validators.required,
      ])),
      apellido:new FormControl("",Validators.compose([
        Validators.required,
      ])),
      email:new FormControl("",Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password:new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))

    });
  }
  registerUser(datos){

  }
  ngOnInit() {
  }

}
