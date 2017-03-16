const http = require('http');
const url = require('url');
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const createDoc = require('./src/db/notifications/createDocuments.js');
const readDoc = require('./src/db/notifications/readDocuments.js');
const notificationRouter = require('./src/routes/notificationRouter.js');
const userRouter = require('./src/routes/userRouter.js');
const locationRouter = require('./src/routes/locationRouter.js');

const PORT = 3000;
const HOST_NAME = '127.0.0.1';
const mongoURL = 'mongodb://localhost:27017/directme';
var mongodb = null;

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api/notifications', notificationRouter);
// app.use('/api/users', userRouter);
app.use('/api/locations', locationRouter);

MongoClient.connect(mongoURL, function(err, db) {
    if(!err) {
        mongodb = db;
        app.locals.mongodb = db;
        console.log("Connected to MongoDB");
        // server.listen(PORT , '192.168.8.100', function(){
        //     console.log("Server listening on: http://localhost:%s", PORT);
        // });
        app.listen(PORT, HOST_NAME);
        console.log("Server listening on: http://localhost:%s", PORT);
    } else {
        db.close();
        server.close();
    }
});
