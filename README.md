# CS_3510069

## Steps to start development for Windows:

Install Node.js from https://nodejs.org/en/download/
* Globally install the Angular CLI : npm install -g @angular/cli
* Globally install Gulp: npm install -g gulp-cli

Install MongoDB from https://www.mongodb.com/download-center?jmp=nav#community
* Create a folder `c:\data\db`
* Add a variabel to PATH with your installation path of MongoDB, for example `C:\Program Files\MongoDB\Server\3.4\bin`

Recommended: 
* Install robomongo to explore the database: https://robomongo.org/

Getting the repository ready:
* Get the repository from GitHub: https://github.com/TomHoekstra/CS_3510069.git
* After downloading use: npm install

Starting the application: 
* To start the webapplication use: npm start
* To start the webserver use: gulp serve (Sometimes you need to run this command twice the first time)
* To start the database use commandline: mongod

## Steps to start production:

Getting the server and application
* npm run build

Preparing the linux server:
* sudo apt-get update
* sudo apt-get install nodejs
* sudo apt-get install nodejs-legacy (Only on older linux versions)
* sudo apt-get install npm
* sudo npm install pm2 -g
* sudo apt-get install -y mongodb-org
* sudo service mongodb start
* sudo apt-get install nginx

Starting the server
* copy dist/server folder to the server: /var/quizapp/server
* run npm install
* NODE_ENV=PROD
* PM2 start /var/quizapp/server/server.js --watch

Starting the application
* copy dist/app folder to the server: /var/quizapp/app
* replace the etc/nginx/nginx.conf with the nginx.conf in the solution
* sudo service nginx reload

## Extra information: 
Command to create a new angular application:
* ng new QuizApp --minimal --inline-template false --routing --style less
