import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Message} from "../../entities/message.entities";
import {MessageService} from "../../services/message.service";
import {formatDate} from "@angular/common";
import {Employe} from "../../entities/employe.entities";
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = new Date(control.value) > new Date();
    return forbidden ? { 'futureDate': {value: control.value} } : null;
  };
}
@Component({
  selector: 'app-newmessage',
  templateUrl: './newmessage.component.html',
  styleUrl: './newmessage.component.css'
})
export class NewmessageComponent {
  @Input() empact : any;

  @Output() newMessage = new EventEmitter<Message>();
  messageFormGroup?: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private messageService:
    MessageService) { }
  ngOnInit(): void {
    this.messageFormGroup = this.fb.group({
      objet:['',Validators.required],
      contenu: ['', Validators.required],
      dateenvoi :[formatDate(new Date(), 'yyyy-MM-dd', 'en'),[Validators.required, futureDateValidator()]]
    });
  }
  onSaveMessage(): void {
    this.submitted = true;
    if (this.messageFormGroup?.invalid) {
      console.log(this.messageFormGroup.controls.dateenvoi.errors);
      return;
    }

    this.messageService.save(this.messageFormGroup?.value,this.empact).subscribe(data => {alert('sauvegarde ok');this.newMessage.emit(data);this.messageFormGroup?.reset();this.submitted=false; },
      err => {
        alert(err.headers.get("error"));
      });
    }

}
