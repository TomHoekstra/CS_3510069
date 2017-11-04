import * as express from 'express';
import { Observable, AsyncSubject } from "rxjs/Rx";
import RouterUtils from '../utils/router.utils';
import Quiz, { IMongooseQuiz } from '../models/quiz.model';
import Auth from '../middleware/auth';
import { isNullOrUndefined } from 'util';
import StudentQuiz from '../models/student-quiz.model';
import { QuizResult } from '../models/quiz-result.model';

export class QuizRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.init();
    }

    init() {
        this.router.post('/create', Auth.authenticate(), (request: express.Request, response: express.Response, next: express.NextFunction) => this.createQuiz(request, response, next));
        this.router.put("/update/:id", Auth.authenticate(), (request: express.Request, response: express.Response, next: express.NextFunction) => this.updateQuiz(request, response, next));
        this.router.delete("/delete/:id", Auth.authenticate(), (request: express.Request, response: express.Response, next: express.NextFunction) => this.deleteQuiz(request, response, next));
        this.router.get("/student/:id", Auth.authenticate(), (request: express.Request, response: express.Response, next: express.NextFunction) => this.getQuizForStudentsByQuizCode(request, response, next));
        this.router.get("/live/:id", Auth.authenticate(), (request: express.Request, response: express.Response, next: express.NextFunction) => this.getLiveQuizByQuizCode(request, response, next));
        this.router.post("/check/:id", Auth.authenticate(), (request: express.Request, response: express.Response, next: express.NextFunction) => this.checkQuizAnswers(request, response, next));
        this.router.get('/', Auth.authenticate(), (request: express.Request, response: express.Response, next: express.NextFunction) => this.getAllQuizzes(request, response, next));
        this.router.get('/:id', Auth.authenticate(), (request: express.Request, response: express.Response, next: express.NextFunction) => this.getQuizById(request, response, next));
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

    public getQuizById(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id = req.params.id;
        Quiz.findById(id).exec((err, quiz: IMongooseQuiz) => {
            RouterUtils.handleResponse(res, err, quiz);
        });
    }

    public getAllQuizzes(req: express.Request, res: express.Response, next: express.NextFunction) {
        Quiz.find().exec((err, quizzes: [IMongooseQuiz]) => {
            RouterUtils.handleResponse(res, err, quizzes);
        });
    }

    public deleteQuiz(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id = req.params.id;

        if (isNullOrUndefined(id)) {
            RouterUtils.handleResponse(res, 'Invalid parameters supplied', null);
        }

        Quiz.remove({ _id: id }, (err) => {
            RouterUtils.handleResponse(res, err, null);
        })
    }

    public getQuizForStudentsByQuizCode(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id = req.params.id;

        Quiz.findOne({ 'quizCode': id }).exec((err, quiz: IMongooseQuiz) => {
            if (err)
                RouterUtils.handleResponse(res, err, null)

            if (quiz === null) {
                RouterUtils.handleResponse(res, err, null);
            }
            else {
                let studentQuiz = new StudentQuiz(quiz);
                RouterUtils.handleResponse(res, err, studentQuiz);
            }
        });
    }

    public getLiveQuizByQuizCode(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id = req.params.id;

        Quiz.findOne({ 'quizCode': id }).exec((err, quiz: IMongooseQuiz) => {
            RouterUtils.handleResponse(res, err, quiz);
        });
    }

    public checkQuizAnswers(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id = req.params.id;
        let studentQuiz: StudentQuiz = req.body;
        Quiz.findOne({ 'quizCode': id }).exec((err, quiz: IMongooseQuiz) => {
            if (err)
                RouterUtils.handleResponse(res, err, null)

            console.log("Found the quiz");
            let quizResult = new QuizResult(quiz, studentQuiz)
            RouterUtils.handleResponse(res, err, quizResult);
        });
    }
}