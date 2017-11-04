import { Component, OnInit } from '@angular/core';
import { IQuiz } from '../../../../server/models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import ServiceResult from '../../../../server/models/service-result.model';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { LiveAnswerService } from '../../services/live-answer.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-quiz-overview',
  templateUrl: './quiz-overview.component.html',
  styles: []
})
export class QuizOverviewComponent implements OnInit {
  quizzes: IQuiz[];

  constructor(private quizService: QuizService, private messageService: MessageService, private router: Router, private liveAnswerService: LiveAnswerService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.quizService.getAllQuizzes().subscribe((result: ServiceResult<IQuiz[]>) => {
      if (result.success) {
        this.quizzes = result.model;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: result.msg });
      }
    });
  }

  removeAnswers(quiz) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.liveAnswerService.resetQuiz(quiz.quizCode).subscribe((result) => {
          if (result.msg) {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: `Quiz couldn't be reset` });
          }
          else {
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: `All live answers for ${quiz.quizCode}-quiz have been reset` });
          }
        });
      }
    });

  }

  edit(quiz) {
    this.router.navigate(['quiz', 'creator', quiz._id]);
  }


}


