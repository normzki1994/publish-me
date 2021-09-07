import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  authStatusListenerSubscription: Subscription = new Subscription();
  user: any;
  
  title = 'publish-me';

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.autoLogin();

    this.authStatusListenerSubscription = this.authService.authStatusListener.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.authStatusListenerSubscription.unsubscribe();
  }
}
