import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentAuthGuard } from './student-auth.guard';
import { AdminAuthGuard } from './admin-auth.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [StudentAuthGuard, AdminAuthGuard]
})
export class GuardModule {

 }
