import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { QuizService } from '../../services/quiz.service';
import { LiveAnswerService } from '../../services/live-answer.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-live-quiz',
  templateUrl: './live-quiz.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class LiveQuizComponent {
  public quizId: string;
  public quiz: any;
  public results: any;
  public selectedQuestion = 0;
  public showAnswers = false;

  bgcolor: string[] = [
    '#0066ff',
    '#993333',
    '#b38600',
    '#990099'
  ]

  getAnswerCount(index: number) {
    if (this.results) {
      let count = 0;
      this.results.forEach(el => {
        if (el.answer === index) {
          count++;
        }
      });

      return count;
    }
  }

  constructor(private messageService: MessageService, private quizService: QuizService, private liveAnswerService: LiveAnswerService) { }

  searchQuiz() {
    if (!this.quizId || this.quizId === '') {
      this.messageService.add({ severity: 'error', summary: 'Invalid QuizID', detail: 'Atleast fill something in!' });
    }
    else {
      this.quizService.getQuizByQuizCode(this.quizId).subscribe((result) => {
        if (result.success) {
          if (!result.model) {
            this.messageService.add({ severity: 'error', summary: 'Invalid QuizID', detail: `No quiz found!` });
          }
          else {
            this.quiz = result.model;
            this.startTimer();
          }
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: result.msg });
        }
      });
    }
  }

  startTimer() {
    let questionTimer = Observable.timer(0, 5000);
    questionTimer.subscribe(t => this.getAnswers());
  }

  getAnswers() {
    let questionId = this.quiz.questions[this.selectedQuestion]._id;

    this.liveAnswerService.getAnswersByQuestion(questionId, this.quizId).subscribe((result) => {
      if (result.model) {
        this.results = result.model;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: result.msg });
      }
    });
  }

  showAnswerToggle(){
    this.showAnswers = !this.showAnswers;
  }

  click(index: number) {
    this.selectedQuestion = index;
    this.getAnswers()
  }


}
