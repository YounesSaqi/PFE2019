import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from "@angular/forms";
import {HostService} from "../service/host.service";
import {Router} from "@angular/router";
import { Commande } from '../model/commande.model';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  msg;
  connForm;transfertFile;cmdchmod;importForm:FormGroup
  chemin;Schema_anc;Tablespace;userDB;passDB;userApp;passSys;adrIp;sid;ses;width;versBd;dump
  constructor(private formBuilder: FormBuilder,private router: Router, private hostService: HostService) { }

  ngOnInit() {
  }


  async onSubmit(){
//Envoyer script
    this.transfertFile=this.formBuilder.group({
      from:["Scripts_Export/import_oracle.sh", Validators.required],
      to:[this.chemin, Validators.required],
    })
//chmod script
    this.cmdchmod=this.formBuilder.group({
       commande:["chmod 777 "+this.chemin+"/import_oracle.sh",Validators.required]
    });

// connexion VM
    this.connForm = this.formBuilder.group({
      id: [],
      user: [this.userApp, Validators.required],
      host: [this.adrIp, Validators.required],
      port:[''],
      password: [this.passSys, Validators.required]
      
    });

  this.importForm = this.formBuilder.group({

  userBd:        [this.userDB, Validators.required],
  passwdBd:      [this.passDB, Validators.required],
  versBd:        [this.versBd,Validators.required],
  sid :          [this.sid, Validators.required],
  cheminImport : [this.chemin, Validators.required],
  nomdump :      [this.dump, Validators.required],
  shema_anc :    [this.Schema_anc, Validators.required],
  Tablespace :   [this.Tablespace, Validators.required]
  
  });
    console.log(this.Tablespace);

    this.ses = await this.hostService.connectHostAsync(this.connForm.value);
    if(this.ses==null){
      this.msg="NonConnexion"
    }else{
      this.msg="Connexion"
      this.width=10
    }

    let upload= await this.hostService.UploadserviceAsync(this.transfertFile.value);
            if(upload==null){
              this.width=20
            }
      
    let cmdCh= await this.hostService.ExcuteCommandeAsync(this.cmdchmod.value);
    if(cmdCh==null){
      this.width=30
    }
    let imp= await  this.hostService.ExcuteImport(this.importForm.value);
            if(imp==null){
              this.width=50
            }




  }
  

  onDeconnect(){


  }
}
