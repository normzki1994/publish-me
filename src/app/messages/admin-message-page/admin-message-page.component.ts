import { Component, OnInit } from '@angular/core';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-admin-message-page',
  templateUrl: './admin-message-page.component.html',
  styleUrls: ['./admin-message-page.component.css']
})
export class AdminMessagePageComponent implements OnInit {
  faSearch = faSearch;

  messages: any = [];

  currentPage: number = 1;
  pageSize: number = 10;
  lastPage: number = 1;

  isLoading: boolean = false;
  modalType: string | null = null;
  modalMessage: string | null = null;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {  
    this.loadMessages("");
  }

  onSearch(searchText: string) {
    this.loadMessages(searchText);
  }

  onPrevious(searchText: string) {
    if(this.currentPage == 1) {
      return;
    }

    this.currentPage = this.currentPage - 1;
    this.loadMessages(searchText);
  }

  onNext(searchText: string) {
    if(this.currentPage >= this.lastPage) {
      return;
    }

    this.currentPage = this.currentPage + 1;
    this.loadMessages(searchText);
  }

  loadMessages(searchText: string) {
    this.isLoading = true;
    this.messageService.getMessages(this.pageSize, this.currentPage, searchText).subscribe(response => {
      this.isLoading = false;
      window.scroll(0, 0);
      this.messages = response.messages;
      this.lastPage = response.lastPage;
    }, error => {
      this.isLoading = false;
      window.scroll(0, 0);
      this.modalType = "Error";
      this.modalMessage = "Something went wrong";
    })
  }
}
