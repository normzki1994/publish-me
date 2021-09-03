import { Component, Input, OnInit } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  faTimes = faTimes;

  @Input() modalType: string | null = null;
  @Input() message: string | null = null;
  isDestroy: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isDestroy = true;
    // }, 10000);
  }

  onModalClose() {
    this.isDestroy = true;
  }
}
