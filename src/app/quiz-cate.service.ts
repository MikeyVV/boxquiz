import {QuizCate} from "./shared/quiz-cate.model";
export class QuizCateService {
  private quizCate: QuizCate[];

  constructor() {
    this.quizCate = [
      new QuizCate(
        'เกม','https://angsila.cs.buu.ac.th/~57160438/wsquiz/questions/game.jpg','game'
      ),
      new QuizCate(
        'การ์ตูน','https://angsila.cs.buu.ac.th/~57160438/wsquiz/questions/cartoon.jpg','cartoon'
      ),
      new QuizCate(
        'ภาพยนตร์','https://angsila.cs.buu.ac.th/~57160438/wsquiz/questions/movie.jpg','movie'
      ),
      new QuizCate(
        'เพลง','https://angsila.cs.buu.ac.th/~57160438/wsquiz/questions/music.jpg','music'
      ),
      new QuizCate(
        'กีฬา','https://angsila.cs.buu.ac.th/~57160438/wsquiz/questions/sport.jpg','sport'
      ),
      new QuizCate(
        'ความรู้ทั่วไป','https://angsila.cs.buu.ac.th/~57160438/wsquiz/questions/general_knowledge.jpg','general_knowledge'
      )
    ];
  }

  getQuizCate(){
    return this.quizCate.slice();
  }
}
