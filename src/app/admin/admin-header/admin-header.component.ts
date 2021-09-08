import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { faBars, faEllipsisV, faRocket, faUserEdit, faBook, faMoneyCheck, faBookOpen, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  faBars = faBars;
  faEllipsisV = faEllipsisV;
  faRocket = faRocket;
  faUserEdit = faUserEdit;
  faBook = faBook;
  faMoneyCheck = faMoneyCheck;
  faBookOpen = faBookOpen;
  faEnvelope = faEnvelope;

  authStatusListenerSubscription: Subscription = new Subscription();
  user: any;

  loginUser: any = null;

  showNav: boolean = false;
  showUserDetails: boolean = false;

  constructor(private authService: AuthService) { 
    
  }

  ngOnInit(): void {
    this.authStatusListenerSubscription = this.authService.authStatusListener.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.authStatusListenerSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  toggleNavCollapse() {
    this.showNav = !this.showNav;
  }

  toggleUserDetails() {
    this.showUserDetails = !this.showUserDetails;
  }
}
