import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { QuizService } from '../../services/quiz.service';
import { LiveAnswerService } from '../../services/live-answer.service';

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

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;
  public barChartData: any[] = [];
  public barChartLabels: string[] = ['Answers'];

  getBarChartData() {
    this.barChartData = [];

    for (let i = 0; i < 4; i++) {
      var answerCount = this.results.filter(res => {
        res.answer === i;
      }).length;

      this.barChartData.push({ data: [answerCount], label: `Answer ${String.fromCharCode(97 + i).toUpperCase()}` });
    }

  }

  constructor(private messageService: MessageService, private quizService: QuizService, private liveAnswerService: LiveAnswerService) { }

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
            this.quiz = result.model;

            this.getAnswers();
          }
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: result.msg });
        }
      });
    }
  }

  getAnswers() {
    let questionId = this.quiz.questions[this.selectedQuestion].id;

    this.liveAnswerService.getAnswersByQuestion(questionId).subscribe((result) => {
      if (result.model) {
        this.results = result.model;
        this.getBarChartData();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: result.msg });
      }
    });
  }

  onChange(index: number) {
    this.selectedQuestion = index;
    this.getAnswers()
  }


}
