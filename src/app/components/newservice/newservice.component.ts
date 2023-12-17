import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceService} from "../../services/service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-newservice',
  templateUrl: './newservice.component.html',
  styleUrl: './newservice.component.css'
})
export class NewserviceComponent {
  serviceFormGroup?: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,private serviceService:ServiceService,private router:Router) {
  }
  ngOnInit(): void {
    this.serviceFormGroup = this.fb.group({
      nom:  ["", Validators.required],
      budget: [0, Validators.required]
    });
  }
  onSaveService() {
    this.submitted = true;
    if (this.serviceFormGroup?.invalid) {
      return;
    }
    this.serviceService.save(this.serviceFormGroup?.value).subscribe(data =>
      {alert("sauvegarde ok");
        this.router.navigateByUrl('service');},
      err => {
        alert(err.headers.get("error"));
      });
  }
}
