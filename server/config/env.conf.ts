//Setting the environments variables for the application
var config = require('./config.json');
import * as winston from 'winston';
import { LogConfig } from './log-config';

export class Environment {

    constructor() {
        
        new LogConfig('C:/Log/');

        if (!process.env.MONGODB_URI) {
            process.env.MONGODB_URI = config.MONGODB_URI;
        }

        if(!process.env.JWT_SECRET)
            process.env.JWT_SECRET = config.JWT_SECRET;

        if(!process.env.COOKIE_SECRET)
            process.env.COOKIE_SECRET = config.COOKIE_SECRET;
    }



    
}