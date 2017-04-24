import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {QuizCateService} from "../quiz-cate.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [QuizCateService]
})
export class HomeComponent implements OnInit {

  @ViewChild('sideBarMenu') sideBarMenu: ElementRef;
  isClick = false;
  constructor(private renderer: Renderer2) { }

  ngOnInit() {

  }

  onToggleMenu() {
    if(window.screen.width <= 425) {
      let left = this.isClick ? '-500px' : '0';
      this.renderer.setStyle(
        this.sideBarMenu.nativeElement,
        'left',
        left
      );
      this.isClick = !this.isClick;
    }else {
      let left = this.isClick ? '0' : '-500px';
      this.renderer.setStyle(
        this.sideBarMenu.nativeElement,
        'left',
        left
      );
      this.isClick = !this.isClick;
    }
  }

  onCloseMenu() {
    if(window.screen.width <= 425) {
      let left = this.isClick ? '-500px' : '0';
      this.renderer.setStyle(
        this.sideBarMenu.nativeElement,
        'left',
        left
      );
      this.isClick = !this.isClick;
    }
  }



}
