import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormsModule , Validators} from "@angular/forms";
import {HostService} from "../service/host.service";
import {Router} from "@angular/router";
import { NgModule } from '@angular/core';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';


@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  userApp;passSys;adrIp;
  userDB;passDB;
  cheminDmp;
  typBd="";
  objExport="";
  listObjExport;
  listObjOra=["Full", "Schema", "Table"];
  listObjIfx= ["Database", "Table"];
  visibilityTypObjExp="invisible";
  visibilityTHObjExp="invisible";visibilityObjExp="invisible";
  visibilityIns="invisible";
  visibilityTHDB="invisible";visibilityDB="invisible";
  session;msg;
  show:boolean=false;
  thObjTh;transfertFile;


   connForm;usrApp;cmdchmod;base;
   cmd;
  constructor(private formBuilder: FormBuilder,private hostService:HostService,private router: Router) { }

  

 

  
  

    ngOnInit() {
      this.session=localStorage.getItem('isLoggedIn');
  
      

      this.transfertFile=this.formBuilder.group({
        from:["Scripts_Export/export_oracle.sh", Validators.required],
        to:["/tmp", Validators.required],
      })
      this.cmdchmod=this.formBuilder.group({
         commande:["chmod 777 /tmp/export_oracle.sh",Validators.required]
      });
    }
    
  
  
    onSubmit() {
      this.connForm = this.formBuilder.group({
        id: [],
        user: [this.userApp, Validators.required],
        host: [this.adrIp, Validators.required],
        port:[''],
        password: [this.passSys, Validators.required]
        
      });
      console.log("helo world !!")
      console.log("user :: "  +this.userApp+" pass :: "+this.passSys+" adr :: "+this.adrIp);
          console.log(this.connForm.value);
        this.hostService.connectHost(this.connForm.value)
          .subscribe( data => {
            if(data!=null){
           //   localStorage.removeItem("commandUsr");
           console.log("param conex :: "+this.connForm.value);
              this.msg='connected';
              console.log("session :: "+data);
              // this.hostService.Uploadservice(this.transfertFile.value)
              //   .subscribe(data=> {
              //     console.log("params de transfert :: "+this.transfertFile.value);
              //       console.log(data);
                    
                    
              //     });
                 
                  this.hostService.uploadAndexecCmd(this.cmdchmod.value,this.transfertFile.value)
                  .then(data=> {
                    console.log(" param transfert  :: "+this.transfertFile.value + " cmd chmd :: "+this.cmdchmod.value);
                      console.log(data);  });
                  // this.router.navigate(['applicatif'])
                  // .then(() => {
                  //   window.location.reload();
                  // });
           // console.log(this.hostService.ExcuteCommande('ls -l /work'))
            
            }
            else{
            this.msg="Non Connection";
            this.router.navigate(['amplitude']);
                 }
          });


          

         
        
    }
   
     delay(callback,duration){
       setTimeout(() => {
        callback();
       }, duration);
     }

    selectTypBd(){
      if(this.typBd=="Oracle"){
        console.log("Oracleeeeeeeeeeeeeeeeee");
        this.listObjExport=this.listObjOra;
        this.objExport="Full";
        this.thObjTh="Nom "+this.objExport;
        
      }
      if(this.typBd=="Informix"){
        console.log("informixxxxxxxxxxxxxxxxxxxxx");
        this.listObjExport=this.listObjIfx;
        this.objExport="Database";
        this.thObjTh="Nom "+this.objExport;
        
      }
    }
    selectObjExport(){
      this.thObjTh="Nom "+this.objExport;
    }
    
  }
  