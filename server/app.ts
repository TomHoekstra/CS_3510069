import * as express from 'express';
import * as mongoose from 'mongoose';
import * as expresswinston from 'express-winston';
import * as winston from 'winston';
import * as bodyParser from 'body-parser';
import * as nocache from 'node-nocache';
import * as cookieParser from 'cookie-parser';

// --- CONFIG-IMPORTS ---
// Load Mongoose config file for connecting to MongoDB instance
import { MongooseConnection } from './config/mongoose.conf';
import { AuthenticationRouter } from './routes/authentication.router';
import Auth from './middleware/auth';
import { QuizRouter } from './routes/quiz.router';
import { TransactionRouter } from './routes/transaction.router';
import { LiveAnswerRouter } from './routes/live-answer.router';
import { StudentRouter } from './routes/student.router';

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        // --- MONGOOSE-CONNECTION ---
        // Pass mongoose configuration the Mongoose instance
        new MongooseConnection(mongoose);

        this.express = express();

        this.express.use(expresswinston.logger({
            winstonInstance: winston
        }));
        this.middleware();

        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(cookieParser(process.env.COOKIE_SECRET));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(Auth.initialize());
    }

    // Configure API endpoints.
    private routes(): void {
        let router = express.Router();

        //Using NoCache to prevent clientside caching
        this.express.use('/api', nocache, router);

        // // --- ROUTES ---
        router.use('/auth', new AuthenticationRouter().router);
        router.use('/quiz', new QuizRouter().router);
        router.use('/transaction', new TransactionRouter().router);
        router.use('/live-answer', new LiveAnswerRouter().router);
        router.use('/student', new StudentRouter().router);

        this.express.use(function (err, req, res, next) {
            if (err.code === 'permission_denied') {
                res.status(401).send('insufficient permissions');
            }
        });
    }
}

export default new App().express;