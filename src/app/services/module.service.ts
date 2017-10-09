import { AuthenticationService } from "./authentication.service";
import { AppStateService } from "./app-state.service";
import { NgModule } from "@angular/core";
import { QuizService } from "./quiz.service";

@NgModule({
  providers: [
    AuthenticationService,
    AppStateService,
    QuizService
  ]
})

export class ServiceModule { }
