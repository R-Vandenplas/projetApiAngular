import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {EmployeService} from "../../services/employe.service";
import {Service} from "../../entities/service.entities";
import {ServiceService} from "../../services/service.service";
@Component({
    selector: 'app-editemploye',
    styleUrls: ['./editemploye.component.css'],
    templateUrl: './editemploye.component.html'
})
export class EditemployeComponent implements OnInit {
  employeFormGroup?: FormGroup;
  submitted = false;
  idEmploye: number;
  services: Service[] = [];
  constructor(private employeService: EmployeService,private fb:
    FormBuilder,activatedRoute : ActivatedRoute,private serviceService:ServiceService) {
    this.idEmploye = activatedRoute.snapshot.params.idemploye;
  }
  ngOnInit(): void {
    this.employeService.getEmploye(this.idEmploye).subscribe(
      employe =>{this.employeFormGroup = this.fb.group({
        idemploye: [employe.idemploye, Validators.required],
        nom: [employe.nom, Validators.required],
        prenom: [employe.prenom, Validators.required],
        mail: [employe.mail, [Validators.required, Validators.email]],
        service_id:[employe.service.id_service,Validators.required]
      })
      });
  }
  onUpdateEmploye(): void {
      console.log(this.employeFormGroup?.value)
    this.submitted = true;
    if (this.employeFormGroup?.invalid) { return; }

    this.employeService.updateEmploye(this.employeFormGroup?.value).subscribe(data => {alert('maj ok')},
      err => {
        alert(err.headers.get("error"));
      });
  }

    chargeServices() {
        this.serviceService.getAllServices().subscribe(data=>this.services=data);
    }
}
