import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminStartComponent } from './admin-start/admin-start.component';
import { QuizCreatorComponent } from './quiz-creator/quiz-creator.component';
import { PanelModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../services/quiz.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PanelModule
  ],
  providers: [QuizService],
  declarations: [AdminStartComponent, QuizCreatorComponent]
})
export class AdminModule { }
