# CS_3510069

Steps to start development for Windows:

Install Node.js from https://nodejs.org/en/download/
Globally install the Angular CLI : npm install -g @angular/cli
Globally install Gulp: npm install -g gulp-cli

Install MongoDB from https://www.mongodb.com/download-center?jmp=nav#community
- Create a folder `d:\data\db`
- Add a variabel to PATH with your installation path of MongoDB, for example `C:\Program Files\MongoDB\Server\3.4\bin`

Recommended: 
Install robomongo to explore the database: https://robomongo.org/

Get the repository from GitHub: https://github.com/TomHoekstra/CS_3510069.git

After downloading use: npm install

To start the webapplication use: npm start
To start the webserver use: gulp serve
To start the database use commandline: mongod

Extra information: 
Command to create a new application:
ng new QuizApp --minimal --inline-template false --routing --style less
