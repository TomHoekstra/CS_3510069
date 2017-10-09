import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { QuizService } from '../../services/quiz.service';
import { IQuiz } from '../../../../server/models/quiz.model';
import { QuizResult } from '../../../../server/models/quiz-result.model';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styles: []
})
export class QuizMakerComponent implements OnInit {
  quizId: string;
  quiz: any;
  quizResult: QuizResult;

  constructor(private messageService: MessageService, private quizService: QuizService) { }

  ngOnInit() {
  }

  startQuiz() {
    if (!this.quizId || this.quizId === '') {
      this.messageService.add({ severity: 'error', summary: 'Invalid QuizID', detail: "Atleast fill something in!" });
    }
    else {
      this.quizService.getStudentQuizById(this.quizId).subscribe((result) => {
        if (result.success) {
          if (!result.model) {
            this.messageService.add({ severity: 'error', summary: 'Invalid QuizID', detail: `No quiz found!` });
          }
          else {
            this.quiz = result.model;
          }
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: result.msg });
        }
      });
    }

  }

  selectCorrectAnswer(questionIndex: number, answerIndex: number) {
    this.quiz.questions[questionIndex - 1].answers.forEach(answer => {
      answer.selected = false;
    });

    this.quiz.questions[questionIndex - 1].answers[answerIndex].selected = true;
  }

  submitQuiz() {
    if (this.checkIfAllQuestionsAreAnswered() && this.quizId) {
      this.quizService.checkQuizAnswers(this.quizId, this.quiz).subscribe((result) => {
          this.quizResult = result.model;
      });
    }
    else{
      this.messageService.add({ severity: 'error', summary: 'Invalid Answers', detail: `Not every question is answered!` });
    }
  }

  checkIfAllQuestionsAreAnswered() {
    let result = true;

    this.quiz.questions.forEach(q => {
      let selectedCount = 0;

      q.answers.forEach(a => {
        if (a.selected === false) {
          selectedCount++;
        }
      });

      if (selectedCount === q.answers.length)
        result = false;
    });

    return result;
  }

}
