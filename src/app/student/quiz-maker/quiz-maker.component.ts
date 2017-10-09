import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { QuizService } from '../../services/quiz.service';
import { IQuiz } from '../../../../server/models/quiz.model';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styles: []
})
export class QuizMakerComponent implements OnInit {
  quizId: string;
  quiz: any;

  constructor(private messageService: MessageService, private quizService: QuizService) { }

  ngOnInit() {
  }

  startQuiz() {
    if (!this.quizId || this.quizId === '') {
      this.messageService.add({ severity: 'error', summary: 'Invalid QuizID', detail: "Atleast fill something in!" });
    }
    else if (!this.quizId.match(/^[0-9a-fA-F]{24}$/)) {  
        this.messageService.add({ severity: 'error', summary: 'Invalid QuizID', detail: "This is no valid QuizID!" });    
    }
    else {
      this.quizService.getQuizById(this.quizId).subscribe((result) => {
        if (result.success) {
          if(!result.model){
            this.messageService.add({ severity: 'error', summary: 'Invalid QuizID', detail: `No quiz found!` });
          }
          else{
            this.quiz = result.model;
            this.quiz.questions.forEach(
              (item, index) => item.index = index + 1
            )
          }      
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: result.msg });
        }
      });
    }

  }
}
