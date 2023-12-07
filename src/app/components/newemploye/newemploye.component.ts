import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeService} from '../../services/employe.service';
import {Service} from "../../entities/service.entities";
import {ServiceService} from "../../services/service.service";

@Component({
  selector: 'app-newemploye',
  templateUrl: './newemploye.component.html',
  styleUrl: './newemploye.component.css'
})
export class NewemployeComponent {
  employeFormGroup?: FormGroup;
  services?:Service[];
  submitted = false;
  constructor(private fb: FormBuilder, private employeService:
    EmployeService,private serviceService:ServiceService) {
  }
  ngOnInit(): void {
    this.employeFormGroup = this.fb.group({
      nom:  ["", Validators.required],
      prenom: ["", Validators.required],
      mail: ["", [Validators.required, Validators.email]],
      service_id:[0,Validators.required]
    });
  }
  onSaveEmploye() {
    console.log(this.employeFormGroup?.value)
    this.submitted = true;
    if (this.employeFormGroup?.invalid) {
      return;
    }
    this.employeService.save(this.employeFormGroup?.value).subscribe(data =>
    {alert("sauvegarde ok")},
      err => {
        alert(err.headers.get("error"));
      });
  }
  chargeServices() {
    this.serviceService.getAllServices().subscribe(data=>this.services=data);

  }
}
