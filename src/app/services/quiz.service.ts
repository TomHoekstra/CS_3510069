import { Injectable } from "@angular/core";
import ServiceResult from "../../../server/models/service-result.model";
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { IQuiz } from "../../../server/models/quiz.model";
import { Quiz } from "../models/quiz.model";
import StudentQuiz from "../../../server/models/student-quiz.model";
import { QuizResult } from "../../../server/models/quiz-result.model";

@Injectable()
export class QuizService {

  constructor(private http: Http) {}

  createQuiz(quiz: Quiz): Observable<ServiceResult<IQuiz>> {
    return this.http.post('api/quiz/create/', quiz)
      .map((res: Response) => res.json());
  }

  getQuizById(id: string): Observable<ServiceResult<IQuiz>> {
    return this.http.get(`api/quiz/${id}`, )
      .map((res: Response) => res.json());
  }

  getStudentQuizById(id: string): Observable<ServiceResult<StudentQuiz>> {
    return this.http.get(`api/quiz/student/${id}`, )
      .map((res: Response) => res.json());
  }


  updateQuiz(quiz: Quiz, id: string): Observable<ServiceResult<IQuiz>> {
    return this.http.put(`api/quiz/update/${id}`, quiz)
      .map((res: Response) => res.json());
  }

  deleteQuiz(id: string): Observable<ServiceResult<IQuiz>> {
    return this.http.delete(`api/quiz/update/${id}`)
      .map((res: Response) => res.json());
  }
  
  getAllQuizzes(): Observable<ServiceResult<IQuiz[]>> {
    return this.http.get(`api/quiz/`, )
      .map((res: Response) => res.json());
  }

  checkQuizAnswers(id: string, quiz: QuizResult) {
    return this.http.post(`api/quiz/check/${id}`, quiz)
      .map((res: Response) => res.json());
  }

  
}
