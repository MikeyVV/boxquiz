import { Component, OnInit } from '@angular/core';
import {FacebookService} from 'ngx-facebook';
import {MyFBService} from "../../myfb.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private fb: FacebookService, private myfb: MyFBService) { }

  ngOnInit() {
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
