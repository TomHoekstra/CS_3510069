import * as winston from 'winston';

export class MongooseConnection {

    constructor(mongoose){
        mongoose.Promise = global.Promise;
        let gracefulExit = function() {

            mongoose.connection.close(() => {

                winston.info(`Mongoose connection ` +
                    `has disconnected through app termination`);

                process.exit(0);
            });
        };

        mongoose.connection.on("connected", (ref) => {

            winston.info(`Successfully connected to local database on startup `);
        });

        // If the connection throws an error
        mongoose.connection.on("error", (err) => {

            winston.error(`Failed to connect to local database on startup `, err);
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', () => {

            winston.info(`Mongoose default connection to local database disconnected`);
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

        // Connect to our MongoDB database using the MongoDB
        // connection URI from our predefined environment variable
        var options ={
            "useMongoClient": true
        };
        mongoose.connect("mongodb://localhost:27017/quizapp", (error) => {

            if (error)
                throw error;
        });
    }

};