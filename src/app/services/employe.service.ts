import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Employe} from '../entities/employe.entities';
@Injectable({providedIn:"root"})
export class EmployeService{
  private host = environment.host;
  constructor(private http: HttpClient){
  }
  getEmploye(idclient: number): Observable<Employe>{
    return this.http.get<Employe>(this.host + '/employe/' + idclient);
  }



  searchEmploye(nom: string): Observable<Employe[]>{
    return this.http.get<Employe[]>(this.host + '/employe/nom=' + nom);
  }

  deleteEmploye(e: Employe): Observable<void>{
    return this.http.delete<void>(this.host + '/employe/' + e.idemploye);
  }
  save(e: Employe): Observable<Employe>{
    return this.http.post<Employe>(this.host + '/employe/', e);
  }

  updateEmploye(e: Employe): Observable<Employe>{
    return this.http.put<Employe>(this.host + '/employe/' + e.idemploye, e);
  }
}
