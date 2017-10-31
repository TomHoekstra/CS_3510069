import * as express from 'express';
import { Observable, AsyncSubject } from "rxjs/Rx";
import RouterUtils from '../utils/router.utils';
import Quiz, { IMongooseQuiz } from '../models/quiz.model';
import Auth from '../middleware/auth';
import { isNullOrUndefined } from 'util';
import StudentQuiz from '../models/student-quiz.model';
import { QuizResult } from '../models/quiz-result.model';

export class LiveAnswerRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.init();
    }

    init() {
        //GET
        //this.router.post('/create', Auth.authenticate(), (request: express.Request, response: express.Response, next: express.NextFunction) => this.createQuiz(request, response, next));
    }
}