import { Component } from '@angular/core';
import {Message} from "../../entities/message.entities";
import {MessageService} from "../../services/message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  message: Message|null=null;
  idmessage :number=0;
  constructor(private messageService: MessageService,private router:Router) {
  }
  ngOnInit(): void {}
  onSearch() {
    this.message=null;
    this.messageService.getMessage(this.idmessage).subscribe(
      {next : data => this.router.navigateByUrl('editMessage/' + data.idmessage ),
        error : error=>alert("message introuvable")
      })
  }

}
