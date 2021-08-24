import { Component, OnInit } from '@angular/core';

import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  faQuoteLeft = faQuoteLeft;

  constructor() { }

  ngOnInit(): void {
  }

}
