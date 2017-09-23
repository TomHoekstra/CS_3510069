import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AppStateService } from '../../services/app-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  constructor(private authenticationService: AuthenticationService, private appStateService: AppStateService, private router: Router) { }

  submitForm({ value, valid }: { value, valid: boolean }) {
    if (valid) {
      this.authenticationService.signIn(value).subscribe((result) => {
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
