const http = require('http');
const fs = require('fs');
const https = require('https');

const url = require('url');
const express = require('express');

//var https = require('https');

//var httpServer = http.createServer(http);
//var httpsServer = https.createServer(credentials, https);

//var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
//var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
//var credentials = {key: privateKey, cert: certificate};

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const createDoc = require('./src/db/notifications/createDocuments.js');
const readDoc = require('./src/db/notifications/readDocuments.js');
const notificationRouter = require('./src/routes/notificationRouter.js');
const userRouter = require('./src/routes/userRouter.js');
const locationRouter = require('./src/routes/locationRouter.js');
const locationRouterToRDA = require('./src/routes/locationRouterToRDA.js');
const locationRouterAtLogin = require('./src/routes/locationRouterAtLogin.js');

const PORTS = 3000;
const PORT = 8080;
const HOST_NAME = 'ewizardz.projects.mrt.ac.lk';
const mongoURL = 'mongodb://localhost:27017/directme';
var  mongodb = null;

const app = express();

app.use(express.static('public'));

const credentials = {
        cert: fs.readFileSync('./sslcert/fullchain.pem'),
        key: fs.readFileSync('./sslcert/privkey.pem')
      };

app.use(require('helmet')());

app.use(express.static('public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api/notifications', notificationRouter); // app.use('/api/users', userRouter);
app.use('/api/locations', locationRouter);
app.use('/api/start/locations', locationRouterAtLogin);
app.use('/locations', locationRouterToRDA); //web user 


//httpServer.listen(8080);
//httpsServer.listen(3000);

//var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);


MongoClient.connect(mongoURL, function(err, db) {
    if(!err) {
        mongodb = db;
        app.locals.mongodb = db;
        console.log("Connected to MongoDB");
        // server.listen(PORT , '192.168.8.100', function(){
        //     console.log("Server listening on: http://localhost:%s", PORT);
        // });

	http.createServer(app).listen(PORT, HOST_NAME);
	https.createServer(credentials, app).listen(PORTS, HOST_NAME);
//	app.listen(PORT, HOST_NAME);
	
        console.log("Server listening on: http://localhost:%s", PORT);
    } else {
        db.close();
        server.close();
    }
});
