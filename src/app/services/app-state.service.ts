import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { IUserData } from '../../../server/models/user-data.model';
import { Router } from '@angular/router';

@Injectable()
export class AppStateService {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.checkIfAnyUserIsSignedIn();
  }

  private currentUser: IUserData;
  public urlAfterLogin: string;

  public setUserData(userData) {
    this.currentUser = userData;
  }

  public navigate(): void {
    console.log(this.currentUser);
    if (this.currentUser.role === 'admin')
      this.router.navigate(['admin']);
    else {
      this.router.navigate(['student']);
    }
  }

  private checkIfAnyUserIsSignedIn() {
    this.authenticationService.getUserDataFromAccesToken().subscribe((result) => {
      if (result.success && result.model) {
        this.currentUser = result.model;
      }
      else {
        this.currentUser = null;
      }
    }, (error) => {
      //Errorhandling
    });
  }

  public checkIfSignedIn() {
    return this.currentUser && this.currentUser.signedIn;
  }

  getFullName(): string {
    return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
  }

}
