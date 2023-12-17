import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceService} from "../../services/service.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
@Component({
  selector: 'app-editservice',
  templateUrl: './editservice.component.html',
  styleUrl: './editservice.component.css'
})
export class EditserviceComponent {
  serviceFormGroup?: FormGroup;
  submitted = false;
  private idService: number;
  constructor(private fb: FormBuilder,private serviceService:ServiceService,activatedRoute : ActivatedRoute,private location:Location) {
    this.idService = activatedRoute.snapshot.params.idservice;
  }
  ngOnInit(): void {
    this.serviceService.getService(this.idService).subscribe(
      service =>{this.serviceFormGroup = this.fb.group({
        idservice: [service.idservice, Validators.required],
        nom: [service.nom, Validators.required],
        budget: [service.budget, Validators.required]
      })
      });

  }
  onUpdateService() {
    this.submitted = true;
    if (this.serviceFormGroup?.invalid) {
      return;
    }
    this.serviceService.updateService(this.serviceFormGroup?.value).subscribe(data =>
      {
        alert("sauvegarde ok")
        this.location.back();
        },
      err => {
        alert(err.headers.get("error"));
      });
  }

}
