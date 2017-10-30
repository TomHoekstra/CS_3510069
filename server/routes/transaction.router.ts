import * as express from 'express';
import { Observable, AsyncSubject } from "rxjs/Rx";
import RouterUtils from '../utils/router.utils';
import Auth from '../middleware/auth';
import Transaction, { IMongooseTransaction, ITransaction } from '../models/transaction.model';
import AuthUtils from '../utils/auth.utils';


export class TransactionRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.init();
    }

    init() {
        this.router.post('/start', Auth.authenticate(), (request: express.Request, response: express.Response, next: express.NextFunction) => this.startTransaction(request, response, next));
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
}