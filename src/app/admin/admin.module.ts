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
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import { PipesModule } from '../pipes/module.pipes';
import { StudentComponent } from './student/student.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ConfirmDialogModule,
    PipesModule,
  ],
  providers: [QuizService, ConfirmationService],
  declarations: [AdminStartComponent, QuizCreatorComponent, QuizOverviewComponent, TransactionViewerComponent, LiveQuizComponent, StudentComponent]
})
export class AdminModule { }
