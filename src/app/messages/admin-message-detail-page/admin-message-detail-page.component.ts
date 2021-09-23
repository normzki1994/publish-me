import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-admin-message-detail-page',
  templateUrl: './admin-message-detail-page.component.html',
  styleUrls: ['./admin-message-detail-page.component.css']
})
export class AdminMessageDetailPageComponent implements OnInit {
  message: any = null;

  isLoading: boolean = false;
  modalType: string | null = null;
  modalMessage: string | null = null;

  constructor(private messageService: MessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      var messageId = param.get("id");

      this.isLoading = true;
      this.messageService.getMessage(messageId).subscribe(message => {
        this.isLoading = false;
        this.message = message;
      }, error => {
        this.isLoading = false;
        this.modalType = "Error";
        this.modalMessage = "Something went wrong";
      })
    })
  }

}
