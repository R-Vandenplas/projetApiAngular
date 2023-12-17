import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Service} from '../entities/service.entities';
@Injectable({providedIn:"root"})
export class ServiceService{
  private host = environment.host;
  constructor(private http: HttpClient) {
  }
  getService(idservice: number): Observable<Service>{
    return this.http.get<Service>(this.host + '/service/' + idservice);
  }
  getAllServices(): Observable<Service[]>{
    return this.http.get<Service[]>(this.host + '/service/all');
  }


  searchService(nom: string): Observable<Service[]>{
    return this.http.get<Service[]>(this.host + '/service/nom=' + nom);
  }

  deleteService(s: Service): Observable<void>{
    return this.http.delete<void>(this.host + '/service/' + s.idservice);
  }
  save(s: Service): Observable<Service>{
    return this.http.post<Service>(this.host + '/service', s);
  }

  updateService(s: Service): Observable<Service>{
    return this.http.put<Service>(this.host + '/service/' + s.idservice, s);
  }
}
