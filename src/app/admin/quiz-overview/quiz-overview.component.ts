import { Component, OnInit } from '@angular/core';
import { IQuiz } from '../../../../server/models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import ServiceResult from '../../../../server/models/service-result.model';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-overview',
  templateUrl: './quiz-overview.component.html',
  styles: []
})
export class QuizOverviewComponent implements OnInit {
  quizzes: IQuiz[];

  constructor(private quizService: QuizService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.quizService.getAllQuizzes().subscribe((result: ServiceResult<IQuiz[]>) => {
      if (result.success) {
        this.quizzes = result.model;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: result.msg });
      }
    });
  }

  edit(quiz)
  {
      this.router.navigate(['quiz', 'creator', quiz._id]);
  }

  
}


