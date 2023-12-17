import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Service} from "../../entities/service.entities";
import {ServiceService} from "../../services/service.service";
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  services?: Service[];
  service? : Service;
  constructor(private serviceService: ServiceService, private router:
    Router) { }
  ngOnInit(): void { }
  onSearch(value: any) {
    this.serviceService.searchService(value.nom).subscribe(
      {
        next: data => {this.services = data}
      });
  }
  onNewService() {
    this.router.navigateByUrl('newService');
  }
  onDelete(s: Service) {
    let v = confirm('êtes vous sûr de vouloir supprimer ? ');
    if (v) {
      this.serviceService.deleteService(s).subscribe(
        {
          next: data => {
            alert('effacement ok');
            this.serviceService.getAllServices().subscribe({next:data=>{this.services = data}});
          },
          error: err => { alert(err.headers.get("error")); }
        }
      );
    }
  }
  onEdit(s: Service) {
    this.router.navigateByUrl('editService/' + s.idservice);
  }
}


