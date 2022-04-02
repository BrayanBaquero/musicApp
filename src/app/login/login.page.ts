import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  validation_messages={
    email: [
      {type:"required", message:"El email es requerido"},
      {type:"pattern", message:"El email es invalido"}
    ],
    password:[
      {type:"required", message:"El password es requerido"},
      {type:"minlength", message:"El password debe contener mas de caracteres"}
    ]
  }

  constructor(private formBuilder: FormBuilder) { 
    this.loginForm=this.formBuilder.group({
      email:new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ])),
      password:new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))

    });

    console.log(this.loginForm)
  }

  loginUser(credentials){
    console.log(credentials)
  }
  ngOnInit() {
  }

}
