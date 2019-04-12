import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from "@angular/forms";
import {HostService} from "../service/host.service";
import {Router} from "@angular/router";
import { Commande } from '../model/commande.model';


@Component({
  selector: 'app-amplitude',
  templateUrl: './amplitude.component.html',
  styleUrls: ['./amplitude.component.css','./amplitude.component.scss',]
})
export class AmplitudeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private hostService: HostService) { }
  connForm: FormGroup;
  commForm:FormGroup;
  msg;host:any;
  cmd :Commande;
  commande;session:string ;
  ngOnInit() {
    this.session=localStorage.getItem('isLoggedIn');

    this.connForm = this.formBuilder.group({
      id: [],
      user: ['', Validators.required],
      host: ['', Validators.required],
      port:[''],
      password: ['', Validators.required]
      
    });
    this.commForm=this.formBuilder.group({
       commande:["ls -l /work/install/profile|cut -d' ' -f3 | grep -v ' '|tail -1",Validators.required]
    });
  }
  


  onSubmit() {
        
      this.hostService.connectHost(this.connForm.value)
        .subscribe( data => {
          if(data!=null){
         //   localStorage.removeItem("commandUsr");
            this.msg='connected';
            this.hostService.ExcuteCommande(this.commForm.value)
              .subscribe(data=> {
                  console.log(data);
                  this.cmd=data;
                   localStorage.removeItem("commandUsr");
                  localStorage.setItem("commandUsr", this.cmd.commande);
                });
               
               
                this.router.navigate(['applicatif'])
                .then(() => {
                  window.location.reload();
                });
         // console.log(this.hostService.ExcuteCommande('ls -l /work'))
          
          }
          else{
          this.msg="Non Connection";
          this.router.navigate(['amplitude']);
               }
        });
       
      
  }

  
}
