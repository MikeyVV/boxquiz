import {Component, OnInit} from '@angular/core';
import {FacebookService, InitParams, LoginOptions, LoginResponse} from 'ngx-facebook';
import {MyFBService} from './myfb.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MyFBService]
})
export class AppComponent implements OnInit {

  loginStatus: boolean;
  loading: boolean = true;

  constructor(private fb: FacebookService, private myfb: MyFBService, private router: Router) {
    const params: InitParams = {
      appId: '770281916471771',
      cookie: true,
      xfbml: true,
      version: 'v2.9'
    };
    fb.init(params);
  }

  ngOnInit() {
    console.log("call APP");
    this.myfb.loginStatusChange
      .subscribe(
        () => {
          this.loginStatus = this.myfb.getStatus();
          if(this.loginStatus) {
            this.router.navigate(['/boxquiz']);
          }else {
            this.router.navigate(['/signin']);
          }
        }
      );
    this.fb.getLoginStatus()
      .then((res)=>{
        if(res.status === "connected"){
          this.myfb.setStatus(true);
          console.log(res.status);
        }else {
          this.myfb.setStatus(false);
        }
        this.loading = false;
      });
  }

}
