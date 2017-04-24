import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FacebookService, InitParams} from 'ngx-facebook';
import {UserPoint} from '../../shared/user-point.model';
import {QuizCateService} from "../../quiz-cate.service";
import {QuizCate} from "../../shared/quiz-cate.model";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() menuToggled = new EventEmitter<void>();
  userPicture: string;
  name: string = "กำลังรับข้อมูล...";
  quizCate : QuizCate[];
  userPoints: UserPoint[] = [
    {cate: 'เกม', point: 0},
    {cate: 'การ์ตูน', point: 1},
    {cate: 'ภาพยนตร์', point: 2},
    {cate: 'เพลง', point: 0},
    {cate: 'กีฬา', point: 5},
    {cate: 'ความรู้ทั่วไป', point: 9}
  ];
  constructor(
    private fb: FacebookService,
    private quizCateService: QuizCateService
  ) {
    const params: InitParams = {
      appId: '770281916471771',
      cookie: true,
      xfbml: true,
      version: 'v2.9'
    };
    fb.init(params)
  }

  ngOnInit() {
    this.fb.getLoginStatus()
      .then(
        (res) => {
          if(res.status === 'connected') {
            this.fb.api('/me', 'get' ,{fields:'name,picture.width(150).height(150)'})
              .then(
                (res) => {
                  this.userPicture = res.picture.data.url;
                  this.name = res.name;
                }
              )
              .catch(
                () => {
                  console.log('sd');
                }
              );
          }
        }
      );
    this.quizCate = this.quizCateService.getQuizCate();
  }

  toggleMenu() {
    this.menuToggled.emit();
  }

}
