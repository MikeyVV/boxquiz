import { Component, OnInit } from '@angular/core';
import {QuizCate} from '../../shared/quiz-cate.model';

@Component({
  selector: 'app-quiz-category',
  templateUrl: './quiz-category.component.html',
  styleUrls: ['./quiz-category.component.css']
})
export class QuizCategoryComponent implements OnInit {

  quizCates: QuizCate[] = [
    {name: 'เกม', picture: 'https://angsila.cs.buu.ac.th/~57160438/wsquiz/questions/game/images/Game_01.jpeg',cate: 'game'},
    {name: 'การ์ตูน', picture: 'https://angsila.cs.buu.ac.th/~57160438/wsquiz/questions/cartoon/images/Cartoon_01.jpeg',cate: 'cartoon'},
    {name: 'ภาพยนตร์', picture: 'https://angsila.cs.buu.ac.th/~57160438/wsquiz/questions/movie/images/Movie_10.jpeg',cate: 'movie'},
    {name: 'เพลง', picture: 'https://angsila.cs.buu.ac.th/~57160438/wsquiz/questions/music/images/Music_15.png',cate : 'music'},
    {name: 'กีฬา', picture: 'https://angsila.cs.buu.ac.th/~57160438/wsquiz/questions/sport/images/Sport_01.jpg',cate: 'sport'},
    {name: 'ความรู้ทั่วไป', picture: 'https://angsila.cs.buu.ac.th/~57160438/wsquiz/questions/general_knowledge/images/General_knowledge_07.png', cate: 'general_knowledge'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
