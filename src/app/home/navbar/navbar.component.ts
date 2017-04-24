import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FacebookService} from 'ngx-facebook';
import {MyFBService} from "../../myfb.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() menuOpened = new EventEmitter<void>();
  constructor(private fb: FacebookService, private myfb: MyFBService) { }

  ngOnInit() {
  }

  openMenu() {
    this.menuOpened.emit();
  }

  logout() {
    this.fb.logout()
      .then(
        () => {
          this.myfb.setStatus(false);
        }
      );
  }

}
