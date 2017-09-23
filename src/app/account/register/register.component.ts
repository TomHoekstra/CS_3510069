import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AppStateService } from '../../services/app-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {

  constructor(private authenticationService: AuthenticationService, private appStateService: AppStateService, private router: Router) { }
  
    submitForm({ value, valid }: { value, valid: boolean }) {
      if (valid) {
        this.authenticationService.register(value).subscribe((result) => {
          if (result.success) {
            this.appStateService.setUserData(result.model);
            this.navigateToHome();
          }
          else {
            //errorhandling
          }
        });
      }
    }
  
    public navigateToHome(): void {
      this.router.navigate(['']);
    }
}
