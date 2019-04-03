import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HostService} from "../service/host.service";
import {Router} from "@angular/router";
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { splitDepsDsl } from '@angular/core/src/view/util';
@Component({
  selector: 'app-connexion-applicatif',
  templateUrl: './connexion-applicatif.component.html',
  styleUrls: ['./connexion-applicatif.component.css']
})
export class ConnexionApplicatifComponent implements OnInit {
  commForm;commForm2:FormGroup;

   base:string="sudo su - `ls -l /work/install/profile|cut -d' ' -f3 | grep -v ' '|tail -1` -c 'echo $BANK && echo $DATABASE && echo $ORACLE_SID && echo $INFORMIXSERVER'";
   usrApp:string="ls -l /work/install/profile|cut -d' ' -f3 | grep -v ' '|tail -1";
   splitted = this.base.split(" ", 2 ); 
   splited;Type;Instance:any;   
  msg;amplitude;
  database:any;
  constructor(private formBuilder: FormBuilder,private hostService:HostService,private router: Router) { 
    
  }

  ngOnInit() {
    console.log(this.splitted[1])
      this.commForm=this.formBuilder.group({
      commande:[this.usrApp,Validators.required]
   });

    this.commForm2=this.formBuilder.group({
      commande:[this.base,Validators.required]
      });
      this.hostService.ExcuteCommande(this.commForm.value)
      .subscribe(data=> {
          console.log(data);
            this.msg=data.commande;
            
        });

    this.hostService.ExcuteCommande(this.commForm2.value)
      .subscribe(data=> {
          console.log(data);
          
            this.splited=data.commande.split("\r\n")
             console.log(this.splited);
            this.database=this.splited[this.splited.length -4];
            this.amplitude=this.splited[this.splited.length -5];
            if(this.splited[this.splited.length -3]!=""){
                this.Type="Oracle";
                this.Instance=this.splited[this.splited.length -3]
            }
            else{
              this.Type="Informix"
              this.Instance=this.splited[this.splited.length -2]
            }
           //   this.database=this.splited[0];
           
            
        });
   

  }
  

  onSubmit() {
  
     
    
}

}
