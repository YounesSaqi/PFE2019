import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormsModule , Validators} from "@angular/forms";
import {HostService} from "../service/host.service";
import {Router} from "@angular/router";
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {
lic1="TAB#CVA00AWZ";
lic2="HD0I00MMKYL3";
maint="GI19Z1SKFLBJ";
to
  constructor(private formBuilder: FormBuilder,private router: Router, private hostService: HostService) { }
  Form_licence;Form_genero;cmdchmod;Form_fgldir: FormGroup;
  licence:string;
  from;fgldir;msg
  ngOnInit() {
    this.fgldir="sudo su - `ls -l /work/install/profile|cut -d' ' -f3 | grep -v ' '|tail -1` -c 'echo $FGLDIR'";
    this.Form_fgldir=this.formBuilder.group({
      commande:[this.fgldir,Validators.required]
    });
    
    this.hostService.ExcuteCommande( this.Form_fgldir.value)
 .subscribe(data=> {
    this.to=data.commande.split("\r\n" ); 
    this.to=this.to[0]; 
  //  console.log(data)
   });


  }
//upload genero
async onUpload(){
  this.cmdchmod=this.formBuilder.group({
    commande:["chmod 777 -R "+this.to,Validators.required]
 });
  
 this.Form_genero=this.formBuilder.group({
  from:[this.from,Validators.required],
  to:[this.to,Validators.required],
  
});
console.log(this.Form_genero.value)
let upload=  await this.hostService.Uploadservice(this.Form_genero.value)

 console.log(upload)
 if(upload==null)
  this.msg="The file has been uploaded succesfully"
  
  let cmdCh= await this.hostService.ExcuteCommandeAsync(this.cmdchmod.value);
  console.log(cmdCh)


}
//saisir les cle genero
  onSubmit(){
   
    this.licence="sudo su - amplitude11 -c 'fglWrt -l << \"EOF\" echo -e TAB#CVA00AWZ"+"\n"+ 
                  "HD0I00MMKYL3 EOF"+"\n"+
                  "echo"+"\n"+ 
                  "fglWrt -m GI19Z1SKFLBJ'";
  //  this.licence="sudo su - `ls -l /work/install/profile|cut -d' ' -f3 | grep -v ' '|tail -1` -c 'fglWrt -l << INS_LIC echo "+this.lic1+ " "+this.lic2+ " INS_LIC echo fglWrt -m "+this.maint+"'" ;
  this.Form_licence=this.formBuilder.group({
    commande:[this.licence,Validators.required]
 });
 console.log(this.Form_licence.value);
 this.hostService.ExcuteCommande( this.Form_licence.value)
 .subscribe(data=> {
   console.log(data)
   });

 //  this.router.navigate(['acceuill'])
 //  console.log(this.licence);
  }
 
  
}
