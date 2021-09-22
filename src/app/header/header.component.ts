import { Component, OnInit } from '@angular/core';

import { faBars, faArrowDown, faTimes, faUser, faSortDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authStatusListenerSubscription: Subscription = new Subscription();
  user: any;

  loginUser: any = null;

  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faSearch = faSearch;
  faBars = faBars;

  showNav: boolean = false;

  constructor(private authService: AuthService) { 
    
  }

  ngOnInit(): void {
    this.user = this.authService.loggedinUser;
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
}
