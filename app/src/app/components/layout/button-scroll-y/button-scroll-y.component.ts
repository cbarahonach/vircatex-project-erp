import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-button-scroll-y',
  templateUrl: './button-scroll-y.component.html',
  styleUrls: ['./button-scroll-y.component.scss']
})
export class ButtonScrollYComponent implements OnInit {
  public hidden = true;

  constructor() { }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
  }

  scroll = (event): void => {
    if (event.srcElement.scrollTop > 200) {
      //this.hidden = false;
    } else {
      this.hidden = true;
    }
  };

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
