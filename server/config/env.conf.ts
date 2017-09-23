var config = require('./config.json');
import * as winston from 'winston';

export class Environment {

    constructor() {

        if(!process.env.JWT_SECRET)
            process.env.JWT_SECRET = config.JWT_SECRET;

        if(!process.env.COOKIE_SECRET)
            process.env.COOKIE_SECRET = config.COOKIE_SECRET;
    }



    
}