import { Component, OnInit } from '@angular/core';
import { IQuiz } from '../../../../server/models/quiz.model';
import { Quiz, Question } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute, Router } from '@angular/router';
import ServiceResult from '../../../../server/models/service-result.model';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-quiz-creator',
  templateUrl: './quiz-creator.component.html',
  styles: []
})
export class QuizCreatorComponent implements OnInit {
  loading: boolean = true;
  quiz: any;
  quizId: string;
  selectedQuestion: number = 0;

  constructor(private quizService: QuizService, private messageService: MessageService, private route: ActivatedRoute, private router: Router, private confirmationService: ConfirmationService) {

  }

  click(index: number) {
    this.selectedQuestion = index;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.quizId = params['id'];
        this.retrieveExistingQuiz(this.quizId);
      } else {
        this.quiz = new Quiz();
        this.addNewQuestion();
        this.loading = false;
      }
    });
  }

  private retrieveExistingQuiz(id: string): void {
    this.quizService.getQuizById(id).subscribe((result: ServiceResult<IQuiz>) => {
      if (result.success) {
        this.quiz = result.model;
        this.loading = false;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: result.msg });
      }
    });
  }

  addNewQuestion() {
    this.quiz.questions.push(new Question());
    this.selectedQuestion = this.quiz.questions.length - 1;
  }

  selectCorrectAnswer(questionIndex: number, answerIndex: number) {
    let count = 0;
    this.quiz.questions[questionIndex].answers.forEach(answer => {
      answer.correct = false;
    });

    this.quiz.questions[questionIndex].answers[answerIndex].correct = true;
  }

  remove() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        let questionId = this.selectedQuestion

        this.selectedQuestion--;

        this.quiz.questions.splice(questionId, 1);
      }
    });
  }

  deleteQuiz() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        if (!this.quizId) {
          this.navigateToAdmin();
          this.messageService.add({ severity: 'info', summary: 'No Quiz Saved', detail: `You've cancelled creating a quiz` });
        }
        else {
          this.quizService.deleteQuiz(this.quizId).subscribe((result) => {
            if (result.success) {
              this.navigateToOverview();
              this.messageService.add({ severity: 'success', summary: 'No Quiz Saved', detail: `You've deleted a quiz` });
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Error Message', detail: result.msg });
            }
          });
        }
      }
    });
  }

  navigateToAdmin() {
    this.router.navigate(['/quiz/overview']);
  }

  navigateToOverview() {
    this.router.navigate(['/quiz/overview']);
  }


  saveQuiz({ value, valid }: { value, valid: boolean }) {
    if (valid && this.quiz.questions.length > 0) {
      if (!this.quizId) {
        this.quizService.createQuiz(this.quiz).subscribe((result) => {
          if (result.success) {
            this.navigateToOverview();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: result.msg });
          }
        });
      }
      else {
        this.quizService.updateQuiz(this.quiz, this.quizId).subscribe((result) => {
          if (result.success) {
            this.navigateToOverview();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: result.msg });
          }
        });
      }
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: `The quiz isn't correct yet` });
    }
  }
}
