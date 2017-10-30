import { AuthenticationService } from "./authentication.service";
import { AppStateService } from "./app-state.service";
import { NgModule } from "@angular/core";
import { QuizService } from "./quiz.service";
import { GuidService } from "./guid.service";
import { TransactionService } from "./transaction.service";

@NgModule({
  providers: [
    AuthenticationService,
    AppStateService,
    QuizService,
    GuidService,
    TransactionService
  ]
})

export class ServiceModule { }
