import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeService} from "../../services/employe.service";
import {Service} from "../../entities/service.entities";
import {ServiceService} from "../../services/service.service";
import {Message} from "../../entities/message.entities";
import {MessageService} from "../../services/message.service";
import {Employe} from "../../entities/employe.entities";
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
  messages?: Message[];
  employe: Employe ={idemploye:0,mail:"",nom:"",prenom:"",service:{idservice:0,nom:"",budget:0}};

  constructor(private employeService: EmployeService,private messageService : MessageService,private fb:
    FormBuilder,activatedRoute : ActivatedRoute,private serviceService:ServiceService,private router:Router) {
    this.idEmploye = activatedRoute.snapshot.params.idemploye;
  }
  ngOnInit(): void {
    this.chargeServices();
    this.employeService.getEmploye(this.idEmploye).subscribe(
      employe =>{this.employeFormGroup = this.fb.group({
        idemploye: [employe.idemploye, Validators.required],
        nom: [employe.nom, Validators.required],
        prenom: [employe.prenom, Validators.required],
        mail: [employe.mail, [Validators.required, Validators.email]],
        idservice:[employe.service.idservice,Validators.required]
      })
        this.employe=employe;
      });
  }
  onUpdateEmploye(): void {
      this.submitted = true;
      if (this.employeFormGroup?.invalid) {
        return;
      }
      this.employe.idemploye = this.employeFormGroup?.value.idemploye;
      this.employe.mail = this.employeFormGroup?.value.mail;
      this.employe.nom=this.employeFormGroup?.value.nom;
      this.employe.prenom=this.employeFormGroup?.value.prenom;
      this.serviceService.getService(this.employeFormGroup?.value.idservice).subscribe(data=>{this.employe.service=data;this.employeService.updateEmploye(this.employe).subscribe(data =>
        {alert("sauvegarde ok")},

        err => {
          alert(err.headers.get("error"));
        });});
    }


    chargeServices() {
        this.serviceService.getAllServices().subscribe(data=>this.services=data);
    }
  ChargeMessages() {
    this.messageService.getMessageEmploye(this.idEmploye).subscribe(data => {this.messages=data},
      err => {
        alert(err.headers.get("error"));
      });
  }
  onEditMes(mes:Message):void{
    this.router.navigateByUrl('editMessage/' + mes.idmessage );
  }
  onDeleteMes(mes:Message):void{
    let v = confirm('êtes vous sûr de vouloir supprimer ? ');
    if (v) {
      this.messageService.deleteMessage(mes).subscribe(
        {
          next: data => {
            alert('effacement ok');
            this.ChargeMessages(); //pour rafraichir la liste
          },
          error: err => { alert(err.headers.get("error")); }
        }
      );
    }
  }
  onAddMessage(mes:Message) {
    this.messages?.push(mes);
    this.router.navigateByUrl('editEmploye/' + this.idEmploye );
    this.ChargeMessages();
  }


}
