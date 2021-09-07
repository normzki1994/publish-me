import { Component, OnInit } from '@angular/core';

import { faBook, faMoneyCheck, faUsers, faUserEdit, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  faBook = faBook;
  faMoneyCheck = faMoneyCheck;
  faUsers = faUsers;
  faUserEdit = faUserEdit;
  faEnvelope = faEnvelope;

  constructor() { }

  ngOnInit(): void {
  }

}
