import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormsModule , Validators} from "@angular/forms";
import {HostService} from "../service/host.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tnsname-ora',
  templateUrl: './tnsname-ora.component.html',
  styleUrls: ['./tnsname-ora.component.css']
})
export class TnsnameOraComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private hostService:HostService,private router: Router) { }
  ipport;database:any;
  formtns;Form_ora:FormGroup;
  ngOnInit() {

    this.database=localStorage.getItem("database");
  }


  onSubmit(form) {

  this.ipport="sudo su - `ls -l /work/install/profile|cut -d' ' -f3 | grep -v ' '|tail -1` -c 'sed -i 's/HOST.*/HOST="+  form.value['ip']  +")(PORT="+form.value['port'] +"))"+"/g'  $FGLDIR/etc/fglprofile.bank '";
 
  this.Form_ora=this.formBuilder.group({
    commande:[this.ipport,Validators.required]
 });

  this.hostService.ExcuteCommande(this.Form_ora.value)
    .subscribe(data=> {
          
      });
      }




}
