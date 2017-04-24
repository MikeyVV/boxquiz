import { Component, OnInit } from '@angular/core';
import {QuizCate} from '../../shared/quiz-cate.model';
import {QuizCateService} from '../../quiz-cate.service';

@Component({
  selector: 'app-quiz-category',
  templateUrl: './quiz-category.component.html',
  styleUrls: ['./quiz-category.component.css']
})
export class QuizCategoryComponent implements OnInit {

  quizCates: QuizCate[];

  constructor(private quizCateService: QuizCateService) { }

  ngOnInit() {
    this.quizCates = this.quizCateService.getQuizCate();
  }

}
