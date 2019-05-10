import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../service/auth.service";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   
  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  //val = JSON.parse(this.userService.getUsers());
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService,private userService:UserService) { }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

   this.userService.getUsers().forEach((item) => {
   if(item.some((obj) => obj.email == this.loginForm.controls.email.value && obj.password == this.loginForm.controls.password.value)){
    localStorage.setItem('isLoggedIn', "true");
    this.router.navigate(['amplitude']);
    }else {
      this.invalidLogin = true;
      localStorage.setItem('isLoggedIn', "false");

    }
   

   });


    
  }

  ngOnInit() {
    localStorage.setItem('isLoggedIn', "false");

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



}
