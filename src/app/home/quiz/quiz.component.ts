import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Http} from '@angular/http';
import {ActivatedRoute, Params} from '@angular/router';

import {Question} from '../../shared/question.model';
import {Option} from '../../shared/option.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  @ViewChild('option1') option1: ElementRef;
  @ViewChild('option2') option2: ElementRef;
  @ViewChild('option3') option3: ElementRef;
  @ViewChild('option4') option4: ElementRef;
  quizCateTitle = "Loading...";
  countdown: string = "10:00";
  cate: string;
  duration: number = 1000;
  timePercent: number = 100;
  imgUrl: string;
  isCorrect = false;
  isClick = false;
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
    private route: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.recreateEverything(params);
        }
      );
  }

  recreateEverything(params: Params) {
    this.cate = params['cate'];
    this.imgUrl = 'https://angsila.cs.buu.ac.th/~57160438/wsquiz/questions/'+this.cate+'/images/';
    this.stopTime();
    this.resetTimeOption();
    this.resetOptionStyle();
    this.currentQuestionNumber = 0;
    this.isCorrect = false;
    this.isClick = false;
    this.answerSend = false;
    this.answer = null;
    this.question = [];
    this.currentQuestion = new Question(
      0,
      'loading...',
      'loading...',
      0,
      'loading...'
    );
    this.getQuestion(this.cate);
    this.setQuizCateTitle();
  }

  setQuizCateTitle() {
    let cate = this.route.snapshot.params['cate'];
    if(cate === 'game') {
      this.quizCateTitle = "เกม";
    }
    else if(cate === 'cartoon') {
      this.quizCateTitle = "การ์ตูน";
    }
    else if(cate === 'music') {
      this.quizCateTitle = "เพลง";
    }
    else if(cate === 'movie') {
      this.quizCateTitle = "ภาพยนตร์";
    }
    else if(cate === 'sport') {
      this.quizCateTitle = "กีฬา";
    }
    else if(cate === 'general_knowledge') {
      this.quizCateTitle = "ความรู้ทั่วไป";
    }
  }

  resetTimeOption() {
    this.countdown = "10:00";
    this.duration = 1000;
    this.timePercent = 100;
  }

  startTime() {
    this.counter = setInterval(() => {
      --this.duration;
      if (this.duration === 0) {
        clearInterval(this.counter);
        this.resetTimeOption();
        this.resetOptionStyle();
        this.showQuestion(this.currentQuestionNumber);
      }
      let a = this.duration / 100;
      let b = this.duration % 100;
      if (a > 9) {
        if (b > 10) {
          this.countdown = (a - (a % 1)) + ":" + b;
        } else {
          this.countdown = (a - (a % 1)) + ":0" + b;
        }
      }else {
        if (b > 10) {
          this.countdown = "0"+(a - (a % 1)) + ":" + b;
        } else {
          this.countdown = "0"+(a - (a % 1)) + ":0" + b;
        }
      }
      this.timePercent -= 0.10;
    }, 10);
  }

  stopTime() {
    clearInterval(this.counter);
  }

  getQuestion(cate: string) {
    let url = 'https://quizapi-165212.appspot.com/question/'+cate+'/random/10';
    this.http.get(url)
      .subscribe((res) => {
        let res_json = res.json();
        res_json.forEach(
          (quiz, index) => {
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
        this.isClick = false;
      })
  }

  onAnswer(el: ElementRef, idOption: number, idAnswer: number) {
    if(!this.isClick) {
      this.isClick = true;
      this.stopTime();
      this.answerSend = true;
      this.isCorrect = idOption === idAnswer;
      this.renderer.removeClass(
        el,
        'card'
      );
      if(idOption === idAnswer) {
        this.renderer.removeClass(
          el,
          'card-option-false'
        );
        this.renderer.addClass(
          el,
          'card-option-true'
        );
      }else {

        this.renderer.addClass(
          el,
          'card-option-false'
        );
        this.renderer.removeClass(
          el,
          'card-option-true'
        );
      }
      setTimeout(()=>{
        this.resetOptionStyle();
        this.resetTimeOption();
        this.showQuestion(this.currentQuestionNumber);
      },2000);
    }
  }

  resetOptionStyle(){
    //reset card-option class
    this.renderer.removeClass(
      this.option1.nativeElement,
      'card'
    );
    this.renderer.addClass(
      this.option1.nativeElement,
      'card'
    );
    this.renderer.removeClass(
      this.option2.nativeElement,
      'card'
    );
    this.renderer.addClass(
      this.option2.nativeElement,
      'card'
    );
    this.renderer.removeClass(
      this.option3.nativeElement,
      'card'
    );
    this.renderer.addClass(
      this.option3.nativeElement,
      'card'
    );
    this.renderer.removeClass(
      this.option4.nativeElement,
      'card'
    );
    this.renderer.addClass(
      this.option4.nativeElement,
      'card'
    );

    //reset card-option-false/true
    this.renderer.removeClass(
      this.option1.nativeElement,
      'card-option-false'
    );
    this.renderer.removeClass(
      this.option1.nativeElement,
      'card-option-true'
    );
    this.renderer.removeClass(
      this.option2.nativeElement,
      'card-option-false'
    );
    this.renderer.removeClass(
      this.option2.nativeElement,
      'card-option-true'
    );
    this.renderer.removeClass(
      this.option3.nativeElement,
      'card-option-false'
    );
    this.renderer.removeClass(
      this.option3.nativeElement,
      'card-option-true'
    );
    this.renderer.removeClass(
      this.option4.nativeElement,
      'card-option-false'
    );
    this.renderer.removeClass(
      this.option4.nativeElement,
      'card-option-true'
    );
  }

}
