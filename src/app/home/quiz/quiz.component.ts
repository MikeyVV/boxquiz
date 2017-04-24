import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {ActivatedRoute} from '@angular/router';

import {Question} from '../../shared/question.model';
import {Option} from '../../shared/option.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  countdown: string = "10:00";
  duration: number = 1000;
  timePercent: number = 100;
  imgUrl: string;
  isCorrect = false;
  answerSend = false;
  answer;
  question: Question[] = [];
  currentQuestionNumber: number = 0;
  currentQuestion: Question = new Question(
    0,
    'loading...',
    'loading...',
    0,
    'loading...'
  );
  option: Option[] = [
    new Option(
      0,
      "loading...",
      0,
      0),
    new Option(
      0,
      "loading...",
      0,
      0),
    new Option(
      0,
      "loading...",
      0,
      0),
    new Option(
      0,
      "loading...",
      0,
      0)
  ];
  counter;

  constructor(
    private http: Http,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let cate = this.route.snapshot.params['cate'];
    this.imgUrl = 'https://angsila.cs.buu.ac.th/~57160438/wsquiz/questions/'+cate+'/images/';
    this.getQuestion(cate);
  }

  startTime() {
    this.counter = setInterval(() => {
      --this.duration;
      if (this.duration === 0) {
        clearInterval(this.counter);
        this.countdown = "10:00";
        this.duration = 1000;
        this.timePercent = 100;
        this.showQuestion(this.currentQuestionNumber);
      }
      let a = this.duration / 100;
      let b = this.duration % 100;
      if (b > 10) {
        this.countdown = "0" + (a - (a % 1)) + ":" + b;
      } else {
        this.countdown = "0" + (a - (a % 1)) + ":0" + b;
      }
      this.timePercent -= 0.10;
    }, 10);
  }

  getQuestion(cate: string) {
    let url = 'https://quizapi-165212.appspot.com/question/'+cate+'/random/10';
    this.http.get(url)
      .subscribe((res) => {
        let res_json = res.json();
        res_json.forEach(
          (quiz, index) => {
            console.log(index);
            this.question.push(
              new Question(
                quiz.idquestion,
                this.imgUrl + quiz.img,
                quiz.question,
                quiz.answer,
                quiz.fk_question_category
              )
            );
            if (index === res_json.length - 1) {
              this.showQuestion(this.currentQuestionNumber);
            }
          }
        );
      })
  }

  showQuestion(quiznum: number) {
    console.log("showQuestion("+quiznum+")");
    this.answerSend = false;
    this.isCorrect = false;
    this.currentQuestion = new Question(
      this.question[quiznum].idquestion,
      this.question[quiznum].imgUrl,
      this.question[quiznum].quizText,
      this.question[quiznum].answer,
      this.question[quiznum].cate
    );
    this.getOption(this.question[quiznum].idquestion);
    ++this.currentQuestionNumber;
  }

  getOption(id: number) {
    let url = 'https://quizapi-165212.appspot.com/question/' + id + '/option';
    this.http.get(url)
      .subscribe((res) => {
        let res_json = res.json();
        res_json.forEach(
          (option, index) => {
            this.option[index] = new Option(
              option.idoption,
              index + 1 + '.' + option.option,
              option.answer,
              option.fk_question_idquestion
            );
            if(option.answer === 1) {
              this.answer = index + 1 + '.' + option.option;
            }
          }
        );
        this.startTime();
      })
  }

  onAnswer(idOption: number, idAnswer: number) {
    console.log(idOption === idAnswer);
    this.answerSend = true;
    this.isCorrect = idOption === idAnswer;
  }

}
