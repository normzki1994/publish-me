import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-introduction-header',
  templateUrl: './introduction-header.component.html',
  styleUrls: ['./introduction-header.component.css']
})
export class IntroductionHeaderComponent implements OnInit {
  @Input() title: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
