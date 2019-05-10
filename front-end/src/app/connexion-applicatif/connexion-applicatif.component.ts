import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormsModule , Validators} from "@angular/forms";
import {HostService} from "../service/host.service";
import {Router} from "@angular/router";
import { NgModule } from '@angular/core';

import { routerNgProbeToken } from '@angular/router/src/router_module';
import { splitDepsDsl } from '@angular/core/src/view/util';
@Component({
  selector: 'app-connexion-applicatif',
  templateUrl: './connexion-applicatif.component.html',
  styleUrls: ['./connexion-applicatif.component.css']
})
export class ConnexionApplicatifComponent implements OnInit {
  commForm;commForm2;UpdateForm;UpdateForm2;UpdateForm3;UpdateForm4;UpdateForm5;password_bank:FormGroup;

   base:string="sudo su - `ls -l /work/install/profile|cut -d' ' -f3 | grep -v ' '|tail -1` -c 'echo $FGLDIR && echo $BANK && echo $DATABASE && echo $ORACLE_SID && echo $INFORMIXSERVER'";
   btl;
   usrApp:string="echo `ls -l /work/install/profile|cut -d' ' -f3 | grep -v ' '|tail -1`";
   bd;gene;amp;sid;inst;passwrd;password;genero;geneo;
   splited;Type;Instance:any;   
   msg;amplitude;pswd;session;amplit
   database;data;text:any;

  constructor(private formBuilder: FormBuilder,private hostService:HostService,private router: Router) { 
    
  }

  ngOnInit() {
    this.session=localStorage.getItem('isLoggedIn');

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
            this.geneo=this.splited[this.splited.length -6];
            this.genero=this.splited[this.splited.length -6];
            this.database=this.splited[this.splited.length -4];
            this.data=this.database;
            this.password=this.database;
            this.amplitude=this.splited[this.splited.length -5];
            this.amplit=this.splited[this.splited.length -5];
            if(this.splited[this.splited.length -3]!=""){
                this.Type="Oracle";
                this.Instance=this.splited[this.splited.length -3]
                this.sid=this.Instance;

            }
            else{
              this.Type="Informix"
              this.Instance=this.splited[this.splited.length -2]
              this.sid=this.Instance;
            }
           //   this.database=this.splited[0];
                
            
        });

        // RECUPErer PASSWORD
  //       this.btl="sudo su - `ls -l /work/install/profile|cut -d' ' -f3 | grep -v ' '|tail -1` -c 'grep "+ this.data+ ".password $FGLDIR/etc/fglprofile.bank |cut -d= -f2'"
  //       console.log(this.database);
  //       this.password_bank=this.formBuilder.group({
  //         commande:[this.btl,Validators.required]
  //      });
       
  //      this.hostService.ExcuteCommande(this.password_bank.value)
  //      .subscribe(data=> {
  //        console.log(data);
  //        this.password=data.commande;
      
  // });


  }
  

  onSubmit(form) {
    this.pswd = "\""+ form.value['password']+  "\""; 

     this.gene="sudo su - `ls -l /work/install/profile|cut -d' ' -f3 | grep -v ' '|tail -1` -c  'sed -i -e s#"+this.geneo+"#"+ form.value['genero'] + "# $AMPLITUDE_PROFILE/my_env_amplitude $AMPLITUDE_PROFILE/env_amplitude ~/.bash_profile  '";
     this.amp="sudo su - `ls -l /work/install/profile|cut -d' ' -f3 | grep -v ' '|tail -1` -c  'sed -i -e s#"+this.amplit+"#"+ form.value['amplitude'] + "# $AMPLITUDE_PROFILE/my_env_amplitude $AMPLITUDE_PROFILE/env_amplitude ~/.bash_profile  '";
     this.bd="sudo su - `ls -l /work/install/profile|cut -d' ' -f3 | grep -v ' '|tail -1` -c  'sed -i -e s/"+this.database+"/"+ form.value['data'] + "/g ~/.bash_profile $FGLDIR/etc/fglprofile.bank '";
     this.inst="sudo su - `ls -l /work/install/profile|cut -d' ' -f3 | grep -v ' '|tail -1` -c  'sed -i -e s/"+"this.Instance"+"/"+ form.value['sid'] + "/g ~/.bash_profile  $AMPLITUDE_PROFILE/my_env_amplitude $AMPLITUDE_PROFILE/env_amplitude $FGLDIR/etc/fglprofile.bank '";
     this.passwrd="sudo su - `ls -l /work/install/profile|cut -d' ' -f3 | grep -v ' '|tail -1` -c 'sed -i 's/"+this.database+".password.*/"+form.value['data']+".password="+  form.value['password']  +"/g'  $FGLDIR/etc/fglprofile.bank '";
     console.log(this.passwrd);
     //this.userr= "sed -i 's/password.*/password="+this.audioUrl+"/g' cih.txt";
   if(this.database!=null && this.Instance!=null){


    //genero
     this.UpdateForm5=this.formBuilder.group({
      commande:[this.gene,Validators.required]
        });
    
    //Amplitude
    this.UpdateForm4=this.formBuilder.group({
      commande:[this.amp,Validators.required]
        });


    //base de donnee
       this.UpdateForm=this.formBuilder.group({
         commande:[this.bd,Validators.required]
      });
  
    //Instance 
      this.UpdateForm2=this.formBuilder.group({
       commande:[this.inst,Validators.required]
      });

    //password
      this.UpdateForm3=this.formBuilder.group({
        commande:[this.passwrd,Validators.required]
       });
  
       this.hostService.ExcuteCommande(this.UpdateForm3.value)
       .subscribe(data=> {                 
       });
    //bd
      this.hostService.ExcuteCommande(this.UpdateForm.value)
     .subscribe(data=> {
               
     });
//genero
console.log(this.UpdateForm5.value)
     this.hostService.ExcuteCommande(this.UpdateForm5.value)
     .subscribe(data=> {
               console.log(data)
               console.log(this.UpdateForm5.value)
     });
//   //amplitude
     this.hostService.ExcuteCommande(this.UpdateForm4.value)
     .subscribe(data=> {
    //  console.log(data) 
     });

 //inst
     this.hostService.ExcuteCommande(this.UpdateForm2.value)
       .subscribe(data=> {
          console.log(data);
         this.router.navigate(['applicatif']) 
         .then(() => {
          if(this.Type=="Oracle"){
      
            this.router.navigate(['tnsname'])
       //   window.location.reload();
          }else
         if(this.Type=="Informix"){
            this.router.navigate(['sqlhosts'])
          
          }

        });
          
           
        });
   
        }
}
onDeconnect(){

  
   if(this.Type=="Oracle"){
    this.router.navigate(['tnsname'])
  }else
 if(this.Type=="Informix"){
    this.router.navigate(['sqlhosts'])  
  }
}
}
