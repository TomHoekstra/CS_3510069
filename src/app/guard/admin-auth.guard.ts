import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs';
import ServiceResult from '../../../server/models/service-result.model';
import { IUserData } from '../../../server/models/user-data.model';
import { AppStateService } from '../services/app-state.service';
import { AuthenticationService } from '../services/authentication.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private appStateService: AppStateService, private authenticationService: AuthenticationService, private router: Router, private messageService: MessageService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const result = new AsyncSubject<boolean>();

    // First check if we are already signed in and the role is admin (using the local appstate)
    if (this.appStateService.checkIfSignedIn() && this.appStateService.roleIsAdmin()) {
      result.next(true);
      result.complete();
    } else {
      // seemingly not but lets check the token against the server.
      this.authenticationService.getUserDataFromAccesToken().subscribe((serviceResult: ServiceResult<IUserData>) => {
        if (serviceResult.success && serviceResult.model.signedIn) {
          if (serviceResult.model.role === 'admin' ) {
            result.next(true);
          }
          else{
            result.next(false);
            this.router.navigate(['/student']);
            this.messageService.add({severity:'error', summary:'Error Message', detail: 'Do not try teacher stuff as a student!'});       
          }
        } else {
          result.next(false);
          this.router.navigate(['/login']);
        }
        result.complete();
      }, (error) => {
        result.next(false);
        this.router.navigate(['/login']);
        result.complete();
      })
    }

    return result;
  }

}
