import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Host} from "../model/host.model";
import {Commande} from "../model/commande.model"
import {Genero} from "../model/genero.model"

 

import {SqlHost} from "../model/sqlhost.model"
import { Export } from '../model/export.model';
@Injectable()
export class HostService {
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
  //   return this.http.post('http://localhost:8080/ssh/commande_export',exp)
  // }
  async ExcuteExport(exp:Export):Promise<Export> {
    const response = await this.http.post<Export>('http://localhost:8080/ssh/commande_export',exp).toPromise();
    return response;
  }


    Uploadservice(genero:Genero){
     
    
     return this.http.post('http://localhost:8080/ssh/upload',genero);
     
 }

async UploadserviceAsync(genero:Genero):Promise<Genero> {
  const response = await this.http.post<Genero>('http://localhost:8080/ssh/upload',genero).toPromise();
  return response;
}

//  Downloadservice(dumpfile:String){
     
    
//   return this.http.post('http://localhost:8080/ssh/download',dumpfile);
   
// }

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