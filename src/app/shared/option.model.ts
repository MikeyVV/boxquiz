export class Option {
  constructor(
    public idoption: number,
    public option: string,
    public answer: number,
    public fk_question_idquestion: number
  ){}
}
