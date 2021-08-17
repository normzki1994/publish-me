import { Component, OnInit } from '@angular/core';

import { faBars, faArrowDown, faTimes, faUser, faSortDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faSearch = faSearch;
  faBars = faBars;

  showNav: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavCollapse() {
    this.showNav = !this.showNav;
  }
}
