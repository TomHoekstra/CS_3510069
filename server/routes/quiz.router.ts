import * as express from 'express';
import { Observable, AsyncSubject } from "rxjs/Rx";
import RouterUtils from '../utils/router.utils';
import Quiz, { IMongooseQuiz } from '../models/quiz.model';
import Auth from '../middleware/auth';
import { isNullOrUndefined } from 'util';

export class QuizRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.init();
    }

    init() {
        this.router.post('/create', Auth.authenticate(), (request: express.Request, response: express.Response, next: express.NextFunction) => this.createQuiz(request, response, next));
        this.router.post("/update/:id", Auth.authenticate(), (request: express.Request, response: express.Response, next: express.NextFunction) => this.updateQuiz(request, response, next));
        this.router.get('/:id', Auth.authenticate(), (request: express.Request, response: express.Response, next: express.NextFunction) => this.getQuiz(request, response, next));
    }

    private createQuiz(req: express.Request, res: express.Response, next: express.NextFunction) {
        Quiz.create(req.body, (err, createdQuiz: IMongooseQuiz) => {
            RouterUtils.handleResponse(res, err, createdQuiz);
        });
    }

    public updateQuiz(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id = req.params.id;
        if (isNullOrUndefined(id)) {
            RouterUtils.handleResponse(res, 'Invalid parameters supplied', null);
        }

        Quiz.findByIdAndUpdate(id, req.body, { new: true }, (err, updatedQuiz: IMongooseQuiz) => {
            RouterUtils.handleResponse(res, err, updatedQuiz);
        });
    }

    public getQuiz(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id = req.params.id;
        Quiz.findById(id).exec((err, quiz: IMongooseQuiz) => {
            RouterUtils.handleResponse(res, err, quiz);
        });

    }

}