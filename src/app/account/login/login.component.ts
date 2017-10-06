import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AppStateService } from '../../services/app-state.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  constructor(private authenticationService: AuthenticationService, private appStateService: AppStateService, private router: Router, private messageService: MessageService) { }

  submitForm({ value, valid }: { value, valid: boolean }) {
    if (valid) {
      this.authenticationService.signIn(value).subscribe((result) => {
        if (result.success) {
          this.appStateService.setUserData(result.model);
          this.appStateService.navigate();
        }
        else {
          this.messageService.add({severity:'error', summary:'Error Message', detail:result.msg});
        }
      });
    }
  }
}
