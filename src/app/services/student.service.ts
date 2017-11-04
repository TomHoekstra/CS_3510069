import { Injectable } from '@angular/core';
import ServiceResult from '../../../server/models/service-result.model';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { IStudent } from '../../../server/models/student.model';

@Injectable()
export class StudentService {

  constructor(private http: Http) {}

  updateOrCreateStudents(students): Observable<ServiceResult<IStudent[]>> {
    return this.http.post('api/student/update', students)
      .map((res: Response) => res.json());
  }  

  getAllStudents(): Observable<ServiceResult<IStudent[]>> {
    return this.http.get(`api/student/`)
      .map((res: Response) => res.json());
  }  
}
