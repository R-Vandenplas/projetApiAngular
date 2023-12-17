import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Message} from "../../entities/message.entities";
import {MessageService} from "../../services/message.service";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import {futureDateValidator} from "../newmessage/newmessage.component";
@Component({
  selector: 'app-editmessage',
  templateUrl: './editmessage.component.html',
  styleUrl: './editmessage.component.css'
})
export class EditmessageComponent {
  messageFormGroup?: FormGroup;
  submitted=false;
  message:Message={idmessage:0,objet:"",contenu:"",dateenvoi:new Date(),emetteur:{idemploye:0,mail:"",nom:"",prenom:"",service:{idservice:0,nom:"",budget:0}}};
  deleted=false;
  idmessage :number=0;
  constructor(private messageService: MessageService, private fb:FormBuilder,private activatedRoute : ActivatedRoute,private location:Location) {
    this.idmessage=activatedRoute.snapshot.params.idmessage;
  }
  ngOnInit(): void {
    this.messageService.getMessage(this.idmessage).subscribe(
      message =>{ this.message=message;
    this.messageFormGroup = this.fb.group({
      idmessage: [this.message?.idmessage],
      objet: [this.message?.objet,Validators.required],
      contenu: [this.message?.contenu, Validators.required],
      dateenvoi: [this.message?.dateenvoi, [Validators.required,futureDateValidator()]],
    });
      });
  }
  onUpdateMessage(): void {
    this.submitted = true;
    if (this.messageFormGroup?.invalid) {
      return;
    }
    let messagemaj:Message=this.messageFormGroup?.value;
    if(this.message) {
      messagemaj.emetteur = this.message.emetteur;
      this.messageService.updateMessage(messagemaj).subscribe({
        next: data =>{ alert('maj ok'); this.location.back();},
        error : err => alert(err.headers.get("error"))
      })
    }
  }

onDeleteMessage() {
  let v = confirm('êtes vous sûr de vouloir supprimer ? ');
  if (v) {
    this.messageService.deleteMessage(this.message).subscribe(data => {
        alert('effacement ok');
        this.deleted=true;
        this.location.back();

      },
      err => {alert(err.headers.get("error"));
      });
  }
}

}
