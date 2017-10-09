import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AppStateService } from '../../services/app-state.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {

  constructor(private authenticationService: AuthenticationService, private appStateService: AppStateService, private router: Router, private messageService: MessageService) { }
  
    submitForm({ value, valid }: { value, valid: boolean }) {
      if (valid) {
        this.authenticationService.register(value).subscribe((result) => {
          if (result.success) {
            this.appStateService.setUserData(result.model);
            this.navigateToHome();
          }
          else {
            this.messageService.add({severity:'error', summary:'Error Message', detail:result.msg});           
          }
        });
      }
    }
  
    public navigateToHome(): void {
      if(this.appStateService.roleIsAdmin())
      {
        this.router.navigate(['/admin']);
      }
      else{
        this.router.navigate(['/student']);
      }
      
    }
}
