import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmployeService} from '../../services/employe.service';
import {Observable} from 'rxjs';
import {Employe} from '../../entities/employe.entities';
@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrl: './employes.component.css'
})
export class EmployesComponent implements OnInit {
  employes?: Employe[];
  employe? : Employe;
  constructor(private employeService: EmployeService, private router:
    Router) { }
  ngOnInit(): void { }
  onSearch(value: any) {
    this.employeService.searchEmploye(value.nom).subscribe(
      {
        next: data => {this.employes = data}
      });
  }
  onNewEmploye() {
    this.router.navigateByUrl('newEmploye');
  }
  onDelete(e: Employe) {
    let v = confirm('êtes vous sûr de vouloir supprimer ? ');
    if (v) {
      this.employeService.deleteEmploye(e).subscribe(
        {
          next: data => {
            this.employeService.searchEmploye("").subscribe({next: data => {this.employes = data}});
          },
          error: err => { alert(err.headers.get("error")); }
        }
      );
    }
  }
  onEdit(e: Employe) {
    this.router.navigateByUrl('editEmploye/' + e.idemploye);
  }
}
