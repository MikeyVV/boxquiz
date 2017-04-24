import {Component, OnInit} from '@angular/core';
import {FacebookService, LoginOptions, LoginResponse} from 'ngx-facebook';
import {MyFBService} from "../myfb.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private fb: FacebookService, private myfb: MyFBService) {}

  ngOnInit() {

  }

  loginWithFacebook() {
    const options: LoginOptions = {
      scope: 'public_profile,user_friends'
    };
    this.fb.login(options)
      .then((response: LoginResponse) => {
        console.log(response);
        if(response.status === 'connected') {
          this.myfb.setStatus(true);
        }else {
          this.myfb.setStatus(false);
        }
      })
      .catch((error: any) => console.error(error));
  }

}
