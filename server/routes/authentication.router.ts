import * as express from 'express';
import { Observable, AsyncSubject } from "rxjs/Rx";
import RouterUtils from '../utils/router.utils';
import User, { IMongooseUser } from '../models/user.model';
import AuthUtils from '../utils/auth.utils';
import { IUserData } from '../models/user-data.model';
import Auth from '../middleware/auth';
import Student, { IMongooseStudent } from '../models/student.model';

export class AuthenticationRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.init();
    }

    init() {
        // Register listeners
        this.router.post('/register', (request: express.Request, response: express.Response, next: express.NextFunction) => this.register(request, response, next));
        this.router.post("/signin", (request: express.Request, response: express.Response, next: express.NextFunction) => this.signIn(request, response, next));
        this.router.post("/signout", Auth.authenticate(), (request: express.Request, response: express.Response, next: express.NextFunction) => this.signOut(request, response, next));
        this.router.get('/userdata', (request: express.Request, response: express.Response, next: express.NextFunction) => this.getUserDataFromAccessToken(request, response, next));
    }

    //Registering a student
    private register(req: express.Request, res: express.Response, next: express.NextFunction) {
        let newUser = req.body;

        Student.findOne({ "studentId": newUser.studentId }).exec((err, student: IMongooseStudent) => {
            if (student === null)
                RouterUtils.handleResponse(res, "You are not registered for this course", student);
            else {
                // Model.find `$or` Mongoose condition, Check if studentId or Email is in use
                User.findOne({
                    $or: [
                        { "studentId": newUser.studentId },
                        { "email": newUser.email }
                    ]
                }, (err, user) => {
                    // If there are any errors, return the error
                    if (err)
                        RouterUtils.handleResponse(res, err, user);

                    // If a user exists with either of those ...
                    if (user) {
                        RouterUtils.handleResponse(res, "That student id/email is already taken.", user);
                    } else {
                        newUser.role = "student";
                        // Save the new user
                        User.create(newUser, (err, createdUser: IMongooseUser) => {
                            RouterUtils.handleResponse(res, err, createdUser);
                        });
                    };
                });
            }
        });
    }

    public signIn(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body.studentId && req.body.password) {
            const studentId = req.body.studentId;
            const password = req.body.password;

            // characters
            User.findOne({
                // Model.find `$or` Mongoose condition
                $or: [
                    { "studentId": studentId },
                ]
            }, (err, user) => {

                // If there are any errors, return the error before anything
                // else
                if (err) {
                    RouterUtils.handleResponse(res, err, user);
                }

                // If no user is found, return a message
                if (!user || user.password != password) {
                    RouterUtils.handleResponse(res, "Login failed", user);
                }
                else {

                    let accessToken = AuthUtils.generateAccessToken(user);

                    AuthUtils.setAccessCookie(res, accessToken);

                    let userData = AuthUtils.getUserData(user);
                    RouterUtils.handleResponse(res, err, userData);
                }
            });
        } else {
            return res.sendStatus(401);
        }
    }

    //SignOut user by clearing cookie
    private signOut(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.clearCookie("access_token");

        let userData: IUserData = {
            signedIn: false,
            role: "NotInterested"
        }

        RouterUtils.handleResponse(res, null, userData);
    }

    //Getting the user data from the acces_token
    private getUserDataFromAccessToken(req: express.Request, res: express.Response, next: express.NextFunction) {
        let token = req.signedCookies["access_token"];

        if (token) {
            let user = AuthUtils.decodeAccesToken(token).user;

            if (user) {
                let userData: IUserData = {
                    signedIn: true,
                    studentId: user.studentId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                };
                RouterUtils.handleResponse(res, null, userData);
            }
            else {
                RouterUtils.handleResponse(res, null, "Not authenticated 1");
            }
        }
        else {
            RouterUtils.handleResponse(res, null, "Not authenticated 2");
        }
    }
}