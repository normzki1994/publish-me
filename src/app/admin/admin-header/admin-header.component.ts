import { Component, OnDestroy, OnInit } from '@angular/core';

import { faBars, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  faBars = faBars;
  faEllipsisV = faEllipsisV;

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
