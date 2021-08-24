import { Component, OnInit } from '@angular/core';
import { Book } from '../books/book.model';

import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Blog } from '../blogs/blog.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faSearch = faSearch;

  countInterval: any = null;

  bookSold: number = 1190;
  bookPublished: number = 1546;
  totalPages: number = 2671;
  subscriber: number = 1290;

  bookSoldCount: number = 0;
  bookPublishedCount: number = 0;
  totalPagesCount: number = 0;
  subscriberCount: number = 0;

  latestBooks: Book[] = [
    { title: "Cindrella", author: "Jenny Amy", price: 20, genre: "Children's Story", bookCover: "book-cover.jpg" },
    { title: "Frozen: Let It Go", author: "Jenny Amy", price: 20, genre: "Children's Story", bookCover: "book-cover-2.jpg" },
    { title: "Basic Algebra", author: "John Play", price: 20, genre: "Education", bookCover: "book-cover-3.jpg" },
    { title: "Biology and Chemistry", author: "Mark Sunder", price: 20, genre: "Education", bookCover: "book-cover-4.jpg" }
  ];

  testimonialIndex: number = 0;

  recentBlogs: Blog[] = [
    { title: "Blog 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", image: "blog-1.jpg", date: new Date("2021-08-21") },
    { title: "Blog 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", image: "blog-2.jpg", date: new Date("2021-08-22") },
    { title: "Blog 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", image: "blog-3.jpg", date: new Date("2021-08-23") }
  ]

  constructor() { }

  ngOnInit(): void {
    var percent = 1;
    this.countInterval = setInterval(() => {
      this.bookSoldCount = Math.round(this.bookSold * (percent / 100));
      this.bookPublishedCount = Math.round(this.bookPublished * (percent / 100));
      this.totalPagesCount = Math.round(this.totalPages * (percent / 100));
      this.subscriberCount = Math.round(this.subscriber * (percent / 100));
      percent = percent + 2;

      if(percent >= 100) {
        this.bookSoldCount = this.bookSold;
        this.bookPublishedCount = this.bookPublished;
        this.totalPagesCount = this.totalPages;
        this.subscriberCount = this.subscriber;
        clearInterval(this.countInterval);
      }
    }, 100);
  }

  moveIndex(index: number) {
    if(index > this.testimonialIndex) {
      this.moveLeft(index - this.testimonialIndex);
    } else if(index < this.testimonialIndex) {
      this.moveRigth(this.testimonialIndex - index);
    }
    this.testimonialIndex = index;
  }

  moveLeft(numberOfTimes: number) {
    var testimonials: any = document.querySelectorAll(".testimonial");

    if(this.testimonialIndex < 3) {
      for(var i = 0; i < testimonials.length; i++) {
        var leftValueString: string = testimonials[i].style.left;
        var leftValue: number = parseInt(leftValueString.substring(0, leftValueString.length - 1));
        var newLeftValue = (leftValue - (numberOfTimes * 100)) + "%";
        testimonials[i].style.left = newLeftValue;
      }
    }
  }

  moveRigth(numberOfTimes: number) {
    var testimonials: any = document.querySelectorAll(".testimonial");

    if(this.testimonialIndex > 0) {
      for(var i = 0; i < testimonials.length; i++) {
        var leftValueString: string = testimonials[i].style.left;
        var leftValue: number = parseInt(leftValueString.substring(0, leftValueString.length - 1));
        var newLeftValue = (leftValue + (numberOfTimes * 100)) + "%";
        testimonials[i].style.left = newLeftValue;
      }
    }
  }
}
