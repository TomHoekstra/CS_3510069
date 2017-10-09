import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs';
import { AppStateService } from '../services/app-state.service';
import { AuthenticationService } from '../services/authentication.service';
import ServiceResult from '../../../server/models/service-result.model';
import { IUserData } from '../../../server/models/user-data.model';

@Injectable()
export class StudentAuthGuard implements CanActivate {

  constructor(private appStateService: AppStateService, private authenticationService: AuthenticationService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const result = new AsyncSubject<boolean>();

    // First check if we are already signed in and the role is student (or admin, who has all the rights) (using the local appstate)
    if (this.appStateService.checkIfSignedIn() && this.appStateService.roleIsStudentOrAdmin()) {
      result.next(true);
      result.complete();
    } else {
      // seemingly not but lets check the token against the server.
      this.authenticationService.getUserDataFromAccesToken().subscribe((serviceResult: ServiceResult<IUserData>) => {
        if (serviceResult.success && serviceResult.model.signedIn) {
          result.next(true);
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
