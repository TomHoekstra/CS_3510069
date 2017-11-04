import * as express from 'express';
import { Observable, AsyncSubject } from 'rxjs/Rx';
import RouterUtils from '../utils/router.utils';
import Quiz, { IMongooseQuiz } from '../models/quiz.model';
import Auth from '../middleware/auth';
import { isNullOrUndefined } from 'util';
import StudentQuiz from '../models/student-quiz.model';
import { QuizResult } from '../models/quiz-result.model';
import LiveAnswer, { IMongooseLiveAnswer } from '../models/live-answer.model';
import AuthUtils from '../utils/auth.utils';

export class LiveAnswerRouter {

    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.init();
    }

    init() {
        this.router.post('/answer', Auth.authenticate(), (request: express.Request, response: express.Response, next: express.NextFunction) => this.updateOrCreateAnswer(request, response, next));
        this.router.post('/results', (request: express.Request, response: express.Response, next: express.NextFunction) => this.getQuestionResult(request, response, next));
        this.router.delete('/results/:id', (request: express.Request, response: express.Response, next: express.NextFunction) => this.deleteQuizAnswers(request, response, next));
    }

    private deleteQuizAnswers(req: express.Request, res: express.Response, next: express.NextFunction) {
        let quizId = req.params.id;

        LiveAnswer.remove({
            'quizId': quizId
        }, (err, liveAnswers: IMongooseLiveAnswer[]) => {
            RouterUtils.handleResponse(res, err, liveAnswers);
        });
    }

    private getQuestionResult(req: express.Request, res: express.Response, next: express.NextFunction) {
        let questionId = req.body;

        LiveAnswer.find({
            $and: [
                { 'questionId': req.body.questionId },
                { 'quizId': req.body.quizId }
            ]
        }, (err, liveAnswers: IMongooseLiveAnswer[]) => {
            RouterUtils.handleResponse(res, err, liveAnswers);
        });
    }

    private updateOrCreateAnswer(req: express.Request, res: express.Response, next: express.NextFunction) {
        let answer = req.body;

        let token = req.signedCookies['access_token'];
        let user = AuthUtils.decodeAccesToken(token).user;

        LiveAnswer.update({
            $and: [
                { 'questionId': answer.questionId },
                { 'studentId': user.studentId }
            ]
        }, answer, { upsert: true }, (err, liveAnswer: IMongooseLiveAnswer) => {
            RouterUtils.handleResponse(res, err, liveAnswer);
        });
    }
}