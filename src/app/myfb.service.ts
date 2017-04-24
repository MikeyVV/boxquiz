import {EventEmitter, Injectable} from '@angular/core';
import {FacebookService} from "ngx-facebook";


@Injectable()
export class MyFBService {
  private loginStatus: boolean = false;
  loginStatusChange = new EventEmitter<void>();

  constructor(private fb: FacebookService) {
  }

  getStatus() {
    return this.loginStatus;
  }

  setStatus(status: boolean) {
    this.loginStatus = status;
    this.loginStatusChange.emit();
  }
}
