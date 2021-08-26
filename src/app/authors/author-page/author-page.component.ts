import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter, faInstagram, faGoogle } from "@fortawesome/free-brands-svg-icons";

import { Author } from '../author.model';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.css']
})
export class AuthorPageComponent implements OnInit {
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faGoogle = faGoogle;

  authors: Author[] = [
    { name: "John Yell", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "author.jpg" },
    { name: "Mark Kenely", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "author-2.jpg" },
    { name: "Leon Barron", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "author-3.jpg" },
    { name: "Pablo Olson", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "author-4.jpg" },
    { name: "Ihsan Atkinson", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "author-5.jpg" },
    { name: "William Stark", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "author-6.jpg" },
    { name: "Lillie Penn", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "author-7.jpg" },
    { name: "Manha Stephenson", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "author-8.jpg" },
    { name: "Mila Mcmanus", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "author-9.jpg" }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
