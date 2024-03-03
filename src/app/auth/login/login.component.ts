import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  // Must import FormGroup from angular/forms
  loginForm: FormGroup;

  constructor(private authService: AuthService){}

  // On component initialization, create a new instance of FormGroup(passes object with form controls), and adds each new control
  // email,password,etc... and allows for a default value, followed by an object with a 'validators' array
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',{validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]})
    })
  }

  onSubmit(){
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
  }

}
