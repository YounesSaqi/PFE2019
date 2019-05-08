import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormsModule , Validators} from "@angular/forms";
import {HostService} from "../service/host.service";
import {Router} from "@angular/router";
import { NgModule } from '@angular/core';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { Genero } from '../model/genero.model';
//import { Promise, reject } from 'q';
//import { resolve } from 'path';


@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})

export class ExportComponent implements OnInit {

  versBd=" ";
  userApp;passSys;adrIp;expForm;
  userDB;passDB;
  cheminDmp: String;
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
  cmdDernierFile;
  dumpFile;
  thObjTh;transfertFile;database=" ";
  instance;
  nomObjExport=" ";
  chemin;
  cmdchmodDump;splited;

   connForm;usrApp;cmdchmod;base;
   cmd;
  constructor(private formBuilder: FormBuilder,private hostService:HostService,private router: Router) { }

  

 

  
  

    ngOnInit() {
      this.session=localStorage.getItem('isLoggedIn');
  
      

     
    }
    
  
  
   async onSubmit() {
    //   let delay =duration => new Promise((resolve,reject)=>{
    //    setTimeout(() =>{ resolve(); },duration
    //   )
    // });
      this.connForm = this.formBuilder.group({
        id: [],
        user: [this.userApp, Validators.required],
        host: [this.adrIp, Validators.required],
        port:[''],
        password: [this.passSys, Validators.required]
        
      });
     console.log(this.cheminDmp.substring(this.cheminDmp.length-1,this.cheminDmp.length));
      if(this.cheminDmp.substring(this.cheminDmp.length-1,this.cheminDmp.length)=="/")
      {
        this.chemin =this.cheminDmp.substring(0,this.cheminDmp.length-1);
        console.log(this.chemin);
      }
      else{
        this.chemin =this.cheminDmp;
      }
      
      this.transfertFile=this.formBuilder.group({
        from:["Scripts_Export/export_oracle.sh", Validators.required],
        to:[this.chemin, Validators.required],
      })
      this.cmdchmod=this.formBuilder.group({
         commande:["chmod 777 "+this.chemin+"/export_oracle.sh",Validators.required]
      });
      this.cmdDernierFile=this.formBuilder.group({
        commande:["ls -rt " +this.chemin+" | tail -1",Validators.required]
     });
     
      



      this.expForm = this.formBuilder.group({
        userBd: [this.userDB, Validators.required],
        passwdBd: [this.passDB, Validators.required],
    
    nomObjExport : [this.nomObjExport, Validators.required],
    instance: [this.instance, Validators.required],
    database : [this.database, Validators.required],
 
    sid : [this.instance, Validators.required],
    cheminExport : [this.chemin, Validators.required],
   typeExport : [this.objExport, Validators.required],
    typeBd : [this.typBd, Validators.required],
    versBd:[this.versBd,Validators.required]
        
      });
    //  this.fonctionAsynchroneOk(this.transfertFile.value).then(this.hostService.Uploadservice) ; 
    //  this.opration(20).then(console.log);// log "résultat"
      console.log("helo world !!");
      console.log("user :: "  +this.userApp+" pass :: "+this.passSys+" adr :: "+this.adrIp);
          console.log(this.connForm.value);


          // let chaine ="tttt\r";
          // chaine=chaine.replace("\\\r","");
          // console.log(chaine);
         
            this.session = await this.hostService.connectHostAsync(this.connForm.value);
            this.session=localStorage.getItem('isLoggedIn');
            
            console.log("session :: "+this.session);
            let upload= await this.hostService.UploadserviceAsync(this.transfertFile.value);
            console.log("upload file :: "+upload);
            let cmdCh= await this.hostService.ExcuteCommandeAsync(this.cmdchmod.value);
            console.log("chmod 777 file  :: "+cmdCh);
            let exp= await  this.hostService.ExcuteExport(this.expForm.value);
            console.log("export   :: "+exp);
            let dernierFile = await this.hostService.ExcuteCommandeAsync(this.cmdDernierFile.value);
            this.splited=dernierFile.commande.split("\r\n");
            console.log(this.splited);
           console.log(this.splited[this.splited.length -1]);
            console.log("dernier file   :: "+this.splited[this.splited.length -2]);
            dernierFile.commande=this.chemin+"/"+this.splited[this.splited.length -2];
            //dernierFile.commande=dernierFile.commande.replace("\\\r","");
            //console.log(dernierFile.commande);

            this.cmdchmodDump=this.formBuilder.group({
              commande:["chmod 777 "+dernierFile.commande,Validators.required]
           });
            let cmdChDump= await this.hostService.ExcuteCommandeAsync(this.cmdchmodDump.value);
            let download= await this.hostService.Downloadservice(dernierFile.commande);
            
        

        // this.hostService.connectHost(this.connForm.value)
        //   .subscribe( data => {
        //     if(data!=null){
        //    //   localStorage.removeItem("commandUsr");
        //    console.log("param conex :: "+this.connForm.value);
        //       this.msg='connected';
        //       console.log("session :: "+data);
              

        //      this.delay(()=> {
        //               this.hostService.Uploadservice(this.transfertFile.value)
        //               .subscribe(data=> {              
        //               console.log(data); });

        //               this.delay(() => {
        //                 this.hostService.ExcuteCommande(this.cmdchmod.value)
        //                 .subscribe(data=> {              
        //                   console.log(data);});

        //                   this.delay(() => {
        //                     this.hostService.ExcuteExport(this.expForm.value)
        //                     .subscribe(data=> { 
        //                       console.log(this.expForm.value)   ;          
        //                       console.log(data);

        //                      });

        //                      this.delay(() => {
        //                       this.hostService.ExcuteCommande(this.cmdDernierFile.value)
        //                       .subscribe(data=> { 
        //                         console.log(data);
        //                         this.dumpFile=data;
                                         
        //                         console.log(this.dumpFile);
  
        //                        });
  
  
                               
        //                     },300);

        //                   },500);
        //               },700);
        //             },1000 );
                      
             
                    
            

              
                   
                    
                 
        //       // this.hostService.Uploadservice(this.transfertFile.value).subscribe(data => {
        //       // this.hostService.ExcuteCommande(this.cmdchmod.value) );
                 
        //           // this.hostService.uploadAndexecCmd(this.cmdchmod.value,this.transfertFile.value)
        //           // .then(data=> {
        //           //   console.log(" param transfert  :: "+this.transfertFile.value + " cmd chmd :: "+this.cmdchmod.value);
        //           //     console.log(data);  });
        //           // // this.router.navigate(['applicatif'])
        //           // .then(() => {
        //           //   window.location.reload();
        //           // });
        //    // console.log(this.hostService.ExcuteCommande('ls -l /work'))
            
          //   }
          //   else{
          //   this.msg="Non Connection";
            
          //        }
          //  });


    

          

         
        
    }
    async  fonctionAsynchroneOk(genero:Genero) {
      // équivaut à :
      // return Promise.resolve('résultat');
      return genero;
     }
     async  add(sum:number) {
      

      // équivaut à :
      // return Promise.resolve('résultat');
       return sum+100;
       
     }

     async  delete(num:number) {
      

      // équivaut à :
      // return Promise.resolve('résultat');
       return num-10;
       
     }

     async opration(sum:number){
       const num= await this.delete(sum);
       const nume= await this.add(sum);
       return nume -num;
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
    selectVersBd(){
      console.log(this.versBd);
    }
    
  }
  