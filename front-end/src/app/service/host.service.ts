import { Injectable } from '@angular/core';
import { HttpClient,HttpEvent,HttpEventType } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import {Host} from "../model/host.model";
import {Commande} from "../model/commande.model"
import {Genero} from "../model/genero.model"
import {SqlHost} from "../model/sqlhost.model"
import { Export } from '../model/export.model';
import { Import } from '../model/Import.model';


@Injectable()
export class HostService {
   event:Event ;
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/ssh';
  
  getUsers() {
  
    return this.http.get<Host[]>(this.baseUrl);
  }

  getUserById(id: number) {
    return this.http.get<Host>(this.baseUrl + '/' + id);
  }

   connectHost(host: Host) {
     return this.http.post(this.baseUrl+'/connect', host);
  }
  async connectHostAsync(host: Host):Promise<Host> {
    const response = await this.http.post<Host>(this.baseUrl+'/connect', host).toPromise();
    return response;
  }
     ExcuteCommande(commande:Commande){
     return this.http.post<Commande>(this.baseUrl + '/commande',  commande);
  }
  async ExcuteCommandeAsync(commande:Commande):Promise<Commande> {
    const response = await this.http.post<Commande>(this.baseUrl + '/commande',  commande).toPromise();
    return response;
  }
  updateHost(host: Host) {
    return this.http.put(this.baseUrl + '/' + host.id, host);
  }

  deleteHost(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  Excutestnsnames(sqlhost:SqlHost){
    return this.http.post('http://localhost:8080/ssh/commande_host',sqlhost)
  }


  // ExcuteExport(exp:Export){
  //   return this.http.post('http://localhost:8080/ssh/commande_import',exp)
  // }

  //export
  async ExcuteExport(exp:Export):Promise<Export> {
    const response = await this.http.post<Export>('http://localhost:8080/ssh/commande_export',exp).toPromise();
    return response;
  }

//import
  async ExcuteImport(impdp:Import):Promise<Import> {
    const response = await this.http.post<Import>('http://localhost:8080/ssh/commande_import',impdp).toPromise();
    return response;
  }

  
  async  Uploadservice(genero:Genero):Promise<Genero>{
     
    
     return await this.http.post<Genero>('http://localhost:8080/ssh/upload',genero).toPromise();
     
 }

async UploadserviceAsync(genero:Genero):Promise<Genero> {
  const response = await this.http.post<Genero>('http://localhost:8080/ssh/upload',genero).toPromise();
  return response;
}

 

//  Downloadservice(dumpfile:String){
     
    
//   return this.http.post('http://localhost:8080/ssh/download',dumpfile);
   
// }

private getEventMessage(event: HttpEvent<any>, formData) {

  switch (event.type) {

    case HttpEventType.UploadProgress:
      return this.fileUploadProgress(event);

    case HttpEventType.Response:
      return this.apiResponse(event);

    default:
      return `File "${formData.get('profile').name}" surprising upload event: ${event.type}.`;
  }
}

private fileUploadProgress(event) {
  const percentDone = Math.round(100 * event.loaded / event.total);
  return { status: 'progress', message: percentDone };
}


private apiResponse(event) {
  return event.body;
}
async Downloadservice(dumpfile:String):Promise<String> {
  const response = await this.http.post<String>('http://localhost:8080/ssh/download',dumpfile).toPromise();
  return response;
}
  deconnexion(){   
    return this.http.get('http://localhost:8080/ssh/deconnect');
  }
  
  // ExcuteCommande2(commande:Commande):Promise<Commande>{
  //   return this.http.post<Commande>(this.baseUrl + '/commande',  commande);
  //   .toPromise()
  //   .catch(this.handelerreur())
  // }
  // handelerreur(error:Response);
  // {
  // console.error(error)
  // return Observable.throw(error);
  // }
  
   async getNombreAsynchrone1() {/* traitement asynchrone (e.g. appel d’une API HTTP) */}
   async getNombreAsynchrone2() {/* traitement asynchrone (e.g. appel d’une API HTTP) */}
  
     async uploadAndexecCmd(commande:Commande,genero:Genero) {
      const cmd1 = await this.Uploadservice(genero);
      const cmd2 = await this.ExcuteCommande(commande);
    
       return  (cmd1+"   "+cmd2);

     }

}