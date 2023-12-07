import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Message} from '../entities/message.entities';
import {Employe} from '../entities/employe.entities';
import {formatDate} from '@angular/common';
@Injectable({providedIn:"root"})
export class MessageService{
  private host = environment.host;
  constructor(private http: HttpClient) {
  }
  deleteMessage(m: Message): Observable<void>{
    return this.http.delete<void>(this.host + '/message/' +
      m.id_message);
  }
  save(m: Message, emp:Employe): Observable<Message>{
    m.emetteur=emp;

    return this.http.post<Message>(this.host + '/message/',m);
  }
  updateMessage(m: Message): Observable<Message>{
    return this.http.put<Message>(this.host + '/message/' +
      m.id_message, m);
  }
  getMessageEmploye(idEmp: number) : Observable<Message[]>{
    return this.http.get<Message[]>(this.host + '/message/idemploye=' +
      idEmp);
  }
}
