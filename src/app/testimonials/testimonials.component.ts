import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  testimonialIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
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
