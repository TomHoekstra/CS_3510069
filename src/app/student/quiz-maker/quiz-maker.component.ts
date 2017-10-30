import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { QuizService } from '../../services/quiz.service';
import { IQuiz } from '../../../../server/models/quiz.model';
import { QuizResult } from '../../../../server/models/quiz-result.model';
import { GuidService } from '../../services/guid.service';
import { TransactionService } from '../../services/transaction.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styles: []
})
export class QuizMakerComponent {
  public quiz: any; 
  public quizId: string;
  public selectedAnswer: number;
  public selectedQuestion: number;
  
  
  private sessionId: string;
  private quizDuration: number;
  private questionDuration: number;


  
  constructor(private messageService: MessageService, private quizService: QuizService, private guidService: GuidService, private transactionService: TransactionService) { }

  searchQuiz() {
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
            this.startQuiz(result.model);
          }
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: result.msg });
        }
      });
    }
  }

  startQuiz(quiz) {
    this.quiz = quiz;
    this.sessionId = this.guidService.newGuid();
    this.selectedQuestion = 0;

    this.quizDuration = 0;
    let quizTimer = Observable.timer(0,1000);
    quizTimer.subscribe(t=>this.quizDuration = t);

    this.transactionService.start(this.sessionId, this.quizId).subscribe((result) => {
      if (result.msg) {    
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: "Transaction log hasn't started. Warn the teacher." });
      }
    });
  }

  onChange(index: number){
    let questionId = this.quiz.questions[this.selectedQuestion].id;
    this.transactionService.dodge(this.sessionId, this.quizId, this.questionDuration, questionId).subscribe((result) => {
      if (result.msg) {    
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: "Transaction log not working" });
      }
    });

    this.selectedQuestion = index;
    this.questionDuration = 0;
    let questionTimer = Observable.timer(0,1000);
    questionTimer.subscribe(t=>this.questionDuration = t);
  }

  submitAnswer(questionIndex: number, answerIndex: number) {
    this.quiz.questions[this.selectedQuestion].answers.forEach(answer => {
      answer.selected = false;
    });

    this.quiz.questions[this.selectedQuestion].answers[this.selectedAnswer].selected = true;
    
    let questionId = this.quiz.questions[this.selectedQuestion].id;
    
    this.transactionService.response(this.sessionId, this.quizId, this.questionDuration, questionId, this.selectedAnswer).subscribe((result) => {
      if (result.msg) {    
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: "Transaction log not working" });
      }
    });

    
  }

  // submitQuiz() {
  //   if (this.checkIfAllQuestionsAreAnswered() && this.quizId) {
  //     this.quizService.checkQuizAnswers(this.quizId, this.quiz).subscribe((result) => {
  //       this.quizResult = result.model;
  //     });
  //   }
  //   else {
  //     this.messageService.add({ severity: 'error', summary: 'Invalid Answers', detail: `Not every question is answered!` });
  //   }
  // }

  // checkIfAllQuestionsAreAnswered() {
  //   let result = true;

  //   this.quiz.questions.forEach(q => {
  //     let selectedCount = 0;

  //     q.answers.forEach(a => {
  //       if (a.selected === false) {
  //         selectedCount++;
  //       }
  //     });

  //     if (selectedCount === q.answers.length)
  //       result = false;
  //   });

  //   return result;
  // }

}
