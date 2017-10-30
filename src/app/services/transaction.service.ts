import { Injectable } from "@angular/core";
import { ITransaction } from "../../../server/models/transaction.model";
import { Http, Response } from "@angular/http";
import ServiceResult from "../../../server/models/service-result.model";
import { Observable } from "rxjs/Observable";


@Injectable()
export class TransactionService {

  constructor(private http: Http) {}

  start(guid, quizId): Observable<ServiceResult<ITransaction>> {
    return this.http.post('api/transaction/start/', { "guid" : guid, "quizId" : quizId})
      .map((res: Response) => res.json());
  } 

  dodge(guid, quizId, duration, questionId): Observable<ServiceResult<ITransaction>> {
    return this.http.post('api/transaction/dodge/', { "guid" : guid, "quizId" : quizId, "duration" : duration, "questionId" : questionId })
      .map((res: Response) => res.json());
  } 

  response(guid, quizId, duration, questionId, answer): Observable<ServiceResult<ITransaction>> {
    return this.http.post('api/transaction/response/', { "guid" : guid, "quizId" : quizId, "duration" : duration,  "questionId" : questionId, "answer" : answer })
      .map((res: Response) => res.json());
  } 
}
