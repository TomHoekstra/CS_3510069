import { Component } from '@angular/core';
import { AppStateService } from './services/app-state.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import {MessageService} from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {
  constructor(private router: Router, private appStateService: AppStateService, private authenticationService: AuthenticationService) {

  }

  public getFullName() {
    return this.appStateService.getFullName();
  }

  public checkIfSignedIn() {
    return this.appStateService.checkIfSignedIn();
  }

  public SignOut() {
    this.authenticationService.signOut().subscribe((result) => {
      this.appStateService.setUserData(result.model);
      this.router.navigate(['/']);
    }, (error) => {
      //Errorhandling
    });
  }

  navigateToRolePage()
  {
    if(this.appStateService.roleIsAdmin())
    {
      this.router.navigate(['/admin']);
    }
    else{
      this.router.navigate(['/student']);
    }
  }
}
