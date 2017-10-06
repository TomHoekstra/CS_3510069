import { Component, OnInit } from '@angular/core';
import { IQuiz } from '../../../../server/models/quiz.model';
import { Quiz, Question } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-quiz-creator',
  templateUrl: './quiz-creator.component.html',
  styles: []
})
export class QuizCreatorComponent implements OnInit {
  display: boolean = false;
  quiz: IQuiz;

  constructor(private quizService: QuizService, private messageService: MessageService) {
    this.quiz = new Quiz();
  }

  ngOnInit() {
  }

  addNewQuestion() {
    this.quiz.questions.push(new Question());
  }

  selectCorrectAnswer(questionIndex: number, answerIndex: number) {
    this.quiz.questions[questionIndex].answers.forEach(answer => {
      answer.correct = false;
    });

    this.quiz.questions[questionIndex].answers[answerIndex].correct = true;
  }

  remove(index: number)
  {
    this.quiz.questions.splice(index, 1);
  }

  saveQuiz({ value, valid }: { value, valid: boolean }) {
    if (valid && this.quiz.questions.length > 0) {
      this.quizService.createQuiz(this.quiz).subscribe((result) => {
        if (result.success) {

        }
        else {
          this.messageService.add({severity:'error', summary:'Error Message', detail:result.msg});           
        }
      });
    }
    else{
      this.messageService.add({severity:'error', summary:'Error Message', detail: "The quiz isn't correct yet"});      
    }
  }
}
