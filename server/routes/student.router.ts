import * as express from 'express';
import { Observable, AsyncSubject } from "rxjs/Rx";
import RouterUtils from '../utils/router.utils';
import Auth from '../middleware/auth';
import Student, { IMongooseStudent } from '../models/student.model';

export class StudentRouter {

    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.init();
    }

    init() {
        this.router.post('/update', Auth.authenticate(), (request: express.Request, response: express.Response, next: express.NextFunction) => this.updateOrCreateStudents(request, response, next));
        this.router.get('/', (request: express.Request, response: express.Response, next: express.NextFunction) => this.getStudentList(request, response, next));
    }

    private getStudentList(req: express.Request, res: express.Response, next: express.NextFunction) {
        Student.find().exec((err, students: [IMongooseStudent]) => {
            RouterUtils.handleResponse(res, err, students);
        });
    }

    private updateOrCreateStudents(req: express.Request, res: express.Response, next: express.NextFunction) {
        let students = req.body;

        Student.remove({}, (err) => { })

        Student.insertMany(students, (err, mongooseStudents: [IMongooseStudent]) => {
            RouterUtils.handleResponse(res, err, mongooseStudents);
        });
    }
}