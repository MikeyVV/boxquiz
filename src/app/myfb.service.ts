import {EventEmitter} from '@angular/core';
export class MyFBService {
  private loginStatus: boolean = false;
  loginStatusChange = new EventEmitter<void>();

  getStatus() {
    return this.loginStatus;
  }

  setStatus(status: boolean) {
    this.loginStatus = status;
    this.loginStatusChange.emit();
  }
}
