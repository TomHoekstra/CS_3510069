import { AuthenticationService } from "./authentication.service";
import { AppStateService } from "./app-state.service";
import { NgModule } from "@angular/core";

@NgModule({
  providers: [
    AuthenticationService,
    AppStateService,
  ]
})

export class ServiceModule { }
