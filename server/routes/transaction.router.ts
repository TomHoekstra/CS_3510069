import * as express from 'express';
import { Observable, AsyncSubject } from 'rxjs/Rx';
import RouterUtils from '../utils/router.utils';
import Auth from '../middleware/auth';
import Transaction, { IMongooseTransaction, ITransaction } from '../models/transaction.model';
import AuthUtils from '../utils/auth.utils';
import Quiz, { IMongooseQuiz } from '../models/quiz.model';

const guard = require("express-jwt-permissions")();


export class TransactionRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.init();
    }

    init() {
        this.router.post('/start', Auth.authenticate(), guard.check(['student']), (request: express.Request, response: express.Response, next: express.NextFunction) => this.startTransaction(request, response, next));
        this.router.post('/dodge', Auth.authenticate(), guard.check(['student']), (request: express.Request, response: express.Response, next: express.NextFunction) => this.dodgeTransaction(request, response, next));
        this.router.post('/response', Auth.authenticate(), guard.check(['student']), (request: express.Request, response: express.Response, next: express.NextFunction) => this.responseTransaction(request, response, next));
        this.router.post('/finish', Auth.authenticate(), guard.check(['student']), (request: express.Request, response: express.Response, next: express.NextFunction) => this.finishTransaction(request, response, next));
        this.router.get('/:id', Auth.authenticate(), guard.check(['student', 'admin']), (request: express.Request, response: express.Response, next: express.NextFunction) => this.getAllTransactionsByQuizCode(request, response, next));
    }

    private startTransaction(req: express.Request, res: express.Response, next: express.NextFunction) {
        let transaction: any = {};

        transaction.timestamp = new Date();
        transaction.quizId = req.body.quizId;
        transaction.sessionId = req.body.guid;

        let token = req.signedCookies['access_token'];
        let user = AuthUtils.decodeAccesToken(token).user;
        transaction.userId = user.studentId;

        transaction.event = 'Start';

        Transaction.create(transaction, (err, transaction: IMongooseTransaction) => {
            RouterUtils.handleResponse(res, err, transaction);
        });
    }

    private dodgeTransaction(req: express.Request, res: express.Response, next: express.NextFunction) {
        let transaction: any = {};

        transaction.timestamp = new Date();
        transaction.quizId = req.body.quizId;
        transaction.questionId = req.body.questionId;
        transaction.sessionId = req.body.guid;
        transaction.timespan = req.body.duration;

        let token = req.signedCookies['access_token'];
        let user = AuthUtils.decodeAccesToken(token).user;
        transaction.userId = user.studentId;

        transaction.event = 'Dodge';

        Transaction.create(transaction, (err, transaction: IMongooseTransaction) => {
            RouterUtils.handleResponse(res, err, transaction);
        });
    }

    private responseTransaction(req: express.Request, res: express.Response, next: express.NextFunction) {
        let transaction: any = {};

        transaction.timestamp = new Date();
        transaction.quizId = req.body.quizId;
        transaction.questionId = req.body.questionId;
        transaction.sessionId = req.body.guid;
        transaction.timespan = req.body.duration;
        transaction.answer = String.fromCharCode(97 + req.body.answer).toUpperCase();

        let token = req.signedCookies['access_token'];
        let user = AuthUtils.decodeAccesToken(token).user;
        transaction.userId = user.studentId;

        transaction.event = 'Response';

        Quiz.findOne({ 'quizCode': transaction.quizId }).exec((err, quiz: IMongooseQuiz) => {
            if (err)
                RouterUtils.handleResponse(res, err, null)

            let question = quiz.questions.filter(q => q._id == transaction.questionId)[0];
            let answer = question.answers.indexOf(question.answers.filter(a => a.correct === true)[0]);
            transaction.result = String.fromCharCode(97 + answer).toUpperCase();

            Transaction.create(transaction, (err, transaction: IMongooseTransaction) => {
                RouterUtils.handleResponse(res, err, transaction);
            });
        });
    }

    private finishTransaction(req: express.Request, res: express.Response, next: express.NextFunction) {
        let transaction: any = {};

        transaction.timestamp = new Date();
        transaction.quizId = req.body.quizId;
        transaction.sessionId = req.body.guid;
        transaction.timespan = req.body.duration;

        let token = req.signedCookies['access_token'];
        let user = AuthUtils.decodeAccesToken(token).user;
        transaction.userId = user.studentId;

        transaction.event = 'Finish';

        Transaction.create(transaction, (err, transaction: IMongooseTransaction) => {
            RouterUtils.handleResponse(res, err, transaction);
        });
    }

    getAllTransactionsByQuizCode(req: express.Request, res: express.Response, next: express.NextFunction) {
        let quizCode = req.params.id;

        Transaction.find({ 'quizId': quizCode }).exec((err, transactions: [IMongooseTransaction]) => {
            RouterUtils.handleResponse(res, err, transactions);
        });
    }
}