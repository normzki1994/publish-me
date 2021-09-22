import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { faMap, faPhone, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from '../messages/message.service';

@Component({
  selector: 'app-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrls: ['./contact-us-page.component.css']
})
export class ContactUsPageComponent implements OnInit {
  faMap = faMap;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faGlobe = faGlobe;

  messageForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    subject: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    message: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(500)])
  });

  get name() { return this.messageForm.get("name") };
  get email() { return this.messageForm.get("email") };
  get subject() { return this.messageForm.get("subject") };
  get message() { return this.messageForm.get("message") };

  isLoading: boolean = false;
  modalType: string | null = null;
  modalMessage: string | null = null;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoading = true;
    this.messageService.addMessage(this.name?.value, this.email?.value, this.subject?.value, this.message?.value)
      .subscribe(response => {
        this.isLoading = false;
        this.modalType = "Info";
        this.modalMessage = "Message submitted";
      }, error => {
        this.isLoading = false;
        this.modalType = "Error";
        this.modalMessage = "Something went wrong";
      });
  }

}
