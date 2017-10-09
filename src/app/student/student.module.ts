import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentStartComponent } from './student-start/student-start.component';
import { QuizMakerComponent } from './quiz-maker/quiz-maker.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {CarouselModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CarouselModule
  ],
  declarations: [StudentStartComponent, QuizMakerComponent]
})
export class StudentModule { }
