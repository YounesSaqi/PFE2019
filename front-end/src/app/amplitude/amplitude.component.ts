import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HostService} from "../service/host.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-amplitude',
  templateUrl: './amplitude.component.html',
  styleUrls: ['./amplitude.component.css','./amplitude.component.scss',]
})
export class AmplitudeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private hostService: HostService) { }
  connForm: FormGroup;
  msg:any;
  ngOnInit() {

    this.connForm = this.formBuilder.group({
      id: [],
      user: ['', Validators.required],
      host: ['', Validators.required],
      port:['',Validators.required],
      password: ['', Validators.required]
      
    });
  }

  onSubmit() {
      this.hostService.connectHost(this.connForm.value)
        .subscribe( data => {
          if(data!=null)
          this.router.navigate(['amplitude']);
          else{
          this.msg="Non Connection";
          this.router.navigate(['amplitude']);}
        });
  }
}
