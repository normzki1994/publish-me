import { Component, OnInit } from '@angular/core';

import { faMap, faPhone, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void {
  }

}
