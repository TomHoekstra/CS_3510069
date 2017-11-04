import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { QuizService } from '../../services/quiz.service';
import { IQuiz } from '../../../../server/models/quiz.model';
import { QuizResult } from '../../../../server/models/quiz-result.model';
import { GuidService } from '../../services/guid.service';
import { TransactionService } from '../../services/transaction.service';
import { Observable } from 'rxjs/Observable';
import { LiveAnswerService } from '../../services/live-answer.service';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styles: []
})
export class QuizMakerComponent {
  public quiz: any;
  public quizId: string;
  public selectedAnswer: number = null;
  public selectedQuestion: number;
  public quizResult: any;

  private sessionId: string;
  private quizDuration: number;
  private questionDuration: number;

  private questionTimer: any;

  constructor(private messageService: MessageService, private quizService: QuizService, private guidService: GuidService, private transactionService: TransactionService, private liveAnswerService: LiveAnswerService) { }

  searchQuiz() {
    if (!this.quizId || this.quizId === '') {
      this.messageService.add({ severity: 'error', summary: 'Invalid QuizID', detail: "Atleast fill something in!" });
    }
    else {
      this.quizService.getStudentQuizByQuizCode(this.quizId).subscribe((result) => {
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

    this.setQuizTimer();
    this.setQuestionTimer();

    this.transactionService.start(this.sessionId, this.quizId).subscribe((result) => {
      if (result.msg) {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: "Transaction log hasn't started. Warn the teacher." });
      }
    });
  }

  click(index: number) {
    if (!this.quizResult) {
      let questionId = this.quiz.questions[this.selectedQuestion].id;
      this.transactionService.dodge(this.sessionId, this.quizId, this.questionDuration, questionId).subscribe((result) => {
        if (result.msg) {
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: "Transaction log not working" });
        }
      });
    }

    this.selectedQuestion = index;
    this.setQuestionTimer();
    this.setSelectedAnswer();
  }

  setQuizTimer() {
    this.quizDuration = 0;
    let quizTimer = Observable.timer(0, 1000);
    quizTimer.subscribe(t => this.quizDuration = t);
  }

  setQuestionTimer() {
    this.questionDuration = 0;
    let questionTimer = Observable.timer(0, 1000);
    this.questionTimer = questionTimer.subscribe(t => this.questionDuration = t);
  }

  submitAnswer() {
    if (this.selectedAnswer === null) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: "Select an answer before submitting" });
      return;
    }

    this.quiz.questions[this.selectedQuestion].answers.forEach(answer => {
      answer.selected = false;
    });

    this.quiz.questions[this.selectedQuestion].answers[this.selectedAnswer].selected = true;

    let questionId = this.quiz.questions[this.selectedQuestion].id;

    this.liveAnswerService.updateOrCreateAnswer(this.quizId, questionId, this.selectedAnswer).subscribe((result) => {
      if (result.msg) {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: "Selected answer hasn't been submitted" });
      }
    });

    this.transactionService.response(this.sessionId, this.quizId, this.questionDuration, questionId, this.selectedAnswer).subscribe((result) => {
      if (result.msg) {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: "Transaction log not working" });
      }
    });

    this.questionTimer.unsubscribe();
    this.setQuestionTimer();


    if (this.selectedQuestion < this.quiz.questions.length - 1) {
      this.selectedQuestion++;
    }
    else {
      this.selectedQuestion = 0;
    }

    this.setSelectedAnswer();
  }


  setSelectedAnswer() {
    let answer = this.quiz.questions[this.selectedQuestion].answers.filter(a => a.selected === true)[0];
    if (answer) {
      this.selectedAnswer = this.quiz.questions[this.selectedQuestion].answers.indexOf(answer);
    }
    else {
      this.selectedAnswer = null;
    }
  }

  submitQuiz() {
    if (this.checkIfAllQuestionsAreAnswered() && this.quizId) {
      this.quizService.checkQuizAnswers(this.quizId, this.quiz).subscribe((result) => {
        this.quizResult = result.model;
        this.transactionService.finish(this.sessionId, this.quizId, this.quizDuration).subscribe((result) => {
          if (result.msg) {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: "Transaction log not working" });
          }
        });
      });
    }
    else {
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

  checkIfWrong(index: number, answer: string) {
    return index === this.selectedAnswer && answer !== this.quizResult.correctedAnswers[this.selectedQuestion].correctAnswer
  }

}
