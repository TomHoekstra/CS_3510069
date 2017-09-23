import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { IUserData } from '../../../server/models/user-data.model';

@Injectable()
export class AppStateService {

  constructor(private authenticationService: AuthenticationService) {
    this.checkIfAnyUserIsSignedIn();
  }

  private currentUser: IUserData;
  public urlAfterLogin: string;

  public setUserData(userData) {
    this.currentUser = userData;
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
