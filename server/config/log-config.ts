import * as winston from 'winston';

//Setting file logging for the application
export class LogConfig {
    constructor(path: string) {
        winston.remove(winston.transports.Console);
        winston.add(winston.transports.Console, {
            level: 'info',
            eol: 'rn',
            json: false,
            handleExceptions: true,
            exitOnError: false,
            colorize: true
        });

        winston.add(winston.transports.File, {
            level: 'info',
            filename: path + 'all-logs.log',
            handleExceptions: true,
            exitOnError: false,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        });
        
        // Comment me to enable console transport for logging
       winston.remove(winston.transports.Console); 
    }
}
