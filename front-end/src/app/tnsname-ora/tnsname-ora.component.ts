import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormsModule , Validators} from "@angular/forms";
import {HostService} from "../service/host.service";
import {Router} from "@angular/router";
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-tnsname-ora',
  templateUrl: './tnsname-ora.component.html',
  styleUrls: ['./tnsname-ora.component.css']
})
export class TnsnameOraComponent implements OnInit {
  oracle_sid:string="sudo su - `ls -l /work/install/profile|cut -d' ' -f3 | grep -v ' '|tail -1` -c 'echo $ORACLE_SID'";
  tnsname:string="sudo su - `ls -l /work/install/profile|cut -d' ' -f3 | grep -v ' '|tail -1` -c 'cat $ORACLE_HOME/network/admin/tnsnames.ora'";
  constructor(private formBuilder: FormBuilder,private hostService:HostService,private router: Router) { }
  ipport;database;ip;sid;msg;port:any;
  Form_ora;Form_sid;formtnsanme:FormGroup;
  ngOnInit() {

    //Recuper Nouveau SID
    this.Form_sid=this.formBuilder.group({
      commande:[this.oracle_sid,Validators.required]
   });
   this.formtnsanme=this.formBuilder.group({
    commande:[this.tnsname,Validators.required]
 });
     
 this.hostService.ExcuteCommande(this.formtnsanme.value)
 .subscribe(data=> {     
   this.msg=data.commande.split("\r\n" ); 
console.log(data)
//this.msg=this.msg[5]
   });

   this.hostService.ExcuteCommande(this.Form_sid.value)
   .subscribe(data=> {
       
    this.sid=data.commande;
     });

      

     }
 



  onSubmit() {
//Modifier tnsname.ora
//this.ipport="sudo su - `ls -l /work/install/profile|cut -d' ' -f3 | grep -v ' '|tail -1` -c 'echo rr >>  $ORACLE_HOME/network/admin/aa'";
   
//   this.Form_ora=this.formBuilder.group({
//     commande:[this.ipport,Validators.required]
//  });

  this.Form_ora=this.formBuilder.group({
  instance:[this.sid,Validators.required],
  port:[this.port,Validators.required],
  ip:[this.ip,Validators.required]

});
 console.log(this.Form_ora.value)

  this.hostService.Excutestnsnames(this.Form_ora.value)
    .subscribe(data=> {
      console.log(data)

      });
      this.router.navigate(['acceuill'])
    }


onDeconnect(){

  this.hostService.deconnexion()
   .subscribe(data=>{
      console.log(data);
   });
   this.router.navigate(['acceuill'])
}

}
