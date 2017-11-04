import { Injectable } from '@angular/core';
import ServiceResult from '../../../server/models/service-result.model';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { ILiveAnswer } from '../../../server/models/live-answer.model';

@Injectable()
export class LiveAnswerService {

  constructor(private http: Http) {}

  updateOrCreateAnswer(quizId, questionId, answer): Observable<ServiceResult<ILiveAnswer>> {
    return this.http.post('api/live-answer/answer/', { 'quizId': quizId, 'questionId' : questionId, 'answer' : answer})
      .map((res: Response) => res.json());
  }  

  resetQuiz(quizId): Observable<ServiceResult<ILiveAnswer>> {
    return this.http.delete(`api/live-answer/results/${quizId}`)
      .map((res: Response) => res.json());
  }  

  getAnswersByQuestion(questionId, quizId): Observable<ServiceResult<ILiveAnswer>> {
    return this.http.post(`api/live-answer/results/`, { 'quizId' : quizId, 'questionId' : questionId })
      .map((res: Response) => res.json());
  }  
}
