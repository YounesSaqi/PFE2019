import { Component, OnInit } from '@angular/core';
import {HostService} from "../service/host.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup,FormsModule , Validators} from "@angular/forms";
import { stringify } from 'querystring';

@Component({
  selector: 'app-sqlhost',
  templateUrl: './sqlhost.component.html',
  styleUrls: ['./sqlhost.component.css']
})
export class SqlhostComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private hostService:HostService,private router: Router) { }
  ipport;database;touch;instancee;ip;;port:any;
  str1;str2;str3:string;
  formtns;Form_touch;Form_base;Form_write:FormGroup;

  instance:string="sudo su - `ls -l /work/install/profile|cut -d' ' -f3 | grep -v ' '|tail -1` -c 'echo $INFORMIXSERVER'";

  ngOnInit() {
 
    
    this.Form_base=this.formBuilder.group({
      commande:[this.instance,Validators.required]
   });
        
   this.hostService.ExcuteCommande(this.Form_base.value)
   .subscribe(data=> {
       
    this.instancee=data.commande;
     });


     }

  
   
  onSubmit(){

 //   this.touch="touch /opt/informix/etc/sqlhosts.h";
           this.str1="/opt/informix/etc/sqlhosts";
           this.str2=this.instancee
    this.str3=this.str2.split("\r\n" ); 

    this.ipport="echo '" +this.str3[0]+"  "+ "onsoctcp"+"  "+ this.ip +"  "+this.port + "' >>/opt/informix/etc/sqlhosts."+this.str3[0]  ;
    console.log(this.ipport)
    
  this.Form_write=this.formBuilder.group({
    commande:[this.ipport,Validators.required]
 });

//  this.Form_write=this.formBuilder.group({
//   instance:[this.str3[0],Validators.required],
//   port:[this.port,Validators.required],
//   ip:[this.ip,Validators.required]

// });
console.log(this.Form_write.value)
//  this.hostService.ExcuteCommande(this.Form_touch.value)
//    .subscribe(data=> {
//     console.log(data)
//      });

       
     this.hostService.ExcuteCommande( this.Form_write.value)
     .subscribe(data=> {
       console.log(this.Form_touch.value)
       });
  
     


     



    }
  
}
