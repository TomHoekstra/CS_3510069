import { Injectable } from '@angular/core';
import ServiceResult from '../../../server/models/service-result.model';
import { Http, Response } from '@angular/http';
import { IUserData } from '../../../server/models/user-data.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';



@Injectable()
export class AuthenticationService {

  constructor(private http: Http) {}

  register(user): Observable<ServiceResult<IUserData>> {
    return this.http.post('api/auth/register/', user)
      .map((res: Response) => res.json());
  }

  getUserDataFromAccesToken(): Observable<ServiceResult<IUserData>> {
    return this.http.get('api/auth/userdata/')
      .map((res: Response) => res.json());
  }

  signOut(): Observable<ServiceResult<IUserData>> {
    return this.http.post('api/auth/signOut/', {})
      .map((res: Response) => res.json());
  }

  signIn(user: string): Observable<ServiceResult<IUserData>> {
    return this.http.post('api/auth/signin/', user)
      .map((res: Response) => res.json());
  }
}
