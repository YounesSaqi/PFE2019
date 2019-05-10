import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from "@angular/forms";
import {HostService} from "../service/host.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-import-bd',
  templateUrl: './import-bd.component.html',
  styleUrls: ['./import-bd.component.css']
})
export class ImportBDComponent implements OnInit {
  transfertFile;cmdchmod
  chemin
  constructor(private formBuilder: FormBuilder,private hostService:HostService,private router: Router) { }

  ngOnInit() {
    
    this.cmdchmod=this.formBuilder.group({
      commande:["chmod 777 "+this.chemin+"/import_oracle.sh",Validators.required]
   });
  }
   Chmod() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.hostService.ExcuteCommande(this.cmdchmod.value)
        resolve('resolved');
      }, 2000);
    });
  }

  async onSubmit(){

    this.transfertFile=this.formBuilder.group({
      from:["Scripts_Export/import_oracle.sh", Validators.required],
      to:[this.chemin, Validators.required],
    })

    this.hostService.Uploadservice(this.transfertFile.value)
    .subscribe(data=> {              
    console.log(data); });

      await this.Chmod();
  }
}
