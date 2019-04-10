import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Host} from "../model/host.model";
import {Commande} from "../model/commande.model"
import {SqlHost} from "../model/sqlhost.model"
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
  ExcuteCommande(commande:Commande){
    return this.http.post<Commande>(this.baseUrl + '/commande',  commande);
  }
  updateHost(host: Host) {
    return this.http.put(this.baseUrl + '/' + host.id, host);
  }

  deleteHost(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  Excutesqlhost(sqlhost:SqlHost){
    return this.http.post('http://localhost:8080/ssh/commande_host',sqlhost)
  }
}