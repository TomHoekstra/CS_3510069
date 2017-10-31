import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminStartComponent } from './admin-start/admin-start.component';
import { QuizCreatorComponent } from './quiz-creator/quiz-creator.component';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../services/quiz.service';
import { QuizOverviewComponent } from './quiz-overview/quiz-overview.component';
import { RouterModule } from '@angular/router';
import { TransactionViewerComponent } from './transaction-viewer/transaction-viewer.component';
import { LiveQuizComponent } from './live-quiz/live-quiz.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule 
  ],
  providers: [QuizService],
  declarations: [AdminStartComponent, QuizCreatorComponent, QuizOverviewComponent, TransactionViewerComponent, LiveQuizComponent]
})
export class AdminModule { }
