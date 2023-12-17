import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeService} from '../../services/employe.service';
import {Service} from "../../entities/service.entities";
import {ServiceService} from "../../services/service.service";
import {Employe} from "../../entities/employe.entities";
import {Router} from "@angular/router";

@Component({
  selector: 'app-newemploye',
  templateUrl: './newemploye.component.html',
  styleUrl: './newemploye.component.css'
})
export class NewemployeComponent {
  employe : Employe ={idemploye:0,mail:"",nom:"",prenom:"",service:{idservice:0,nom:"",budget:0}};
  employeFormGroup?: FormGroup;
  service  :Service={idservice:0,nom:"",budget:0};

  services?:Service[];
  submitted = false;
  constructor(private fb: FormBuilder, private employeService:
    EmployeService,private serviceService:ServiceService,private router:Router) {
  }
  ngOnInit(): void {
    this.chargeServices();
    this.employeFormGroup = this.fb.group({
      mail: ["", [Validators.required, Validators.email]],
      nom:  ["", Validators.required],
      prenom: ["", Validators.required],
      idservice:[0,Validators.required]
    });
  }
  onSaveEmploye() {
    this.submitted = true;
    if (this.employeFormGroup?.invalid){
      return;
    }

    this.employe.mail = this.employeFormGroup?.value.mail;
    this.employe.nom=this.employeFormGroup?.value.nom;
    this.employe.prenom=this.employeFormGroup?.value.prenom;
    this.service={idservice:0,nom:"",budget:0}
    this.serviceService.getService(this.employeFormGroup?.value.idservice).subscribe(data=>{this.service=data;this.employe.service=this.service;this.employeService.save(this.employe).subscribe(data =>
      {alert("sauvegarde ok")
      this.router.navigateByUrl('employe');},

      err => {
        alert(err.headers.get("error"));
      });});
  }
  chargeServices() {
    this.serviceService.getAllServices().subscribe(data=>this.services=data);

  }
}
