import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  countInterval: any = null;

  bookSold: number = 1190;
  bookPublished: number = 1546;
  totalPages: number = 2671;
  subscriber: number = 1290;

  bookSoldCount: number = 0;
  bookPublishedCount: number = 0;
  totalPagesCount: number = 0;
  subscriberCount: number = 0;
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

}
