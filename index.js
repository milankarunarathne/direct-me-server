const http = require('http');
const url = require('url');
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const createDoc = require('./src/db/notifications/createDocuments.js');
const readDoc = require('./src/db/notifications/readDocuments.js');
const notificationRouter = require('./src/routes/notificationRouter.js');
const userRouter = require('./src/routes/userRouter.js');

const PORT = 3000;
const HOST_NAME = '192.168.8.100';
const mongoURL = 'mongodb://localhost:27017/directme';
var mongodb = null;
const collectionName = 'contacts';
const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/notifications', notificationRouter);
// app.use('/users', userRouter);

// app.get('/', function(req, res) {
//     res.json({message: 'Welcome to Direct Me.'});
// })

var server = http.createServer((req, res) => {
	console.log('>>>>>>>', req.method);  // console print for justification
	// res.writeHead(200, {'Content-Type': 'application/json'});
 //    res.end(JSON.stringify({message: 'Unable to read'}));
 //    return;

    switch(req.method) {
        case 'GET': // Read
            var query = url.parse(req.url, true).query;
            // HACK: There is an issue with query s.t. 1 is interprete as '1' (a String)
            var newQuery = {};
            for(let key in query) {
                newQuery[key] = (!isNaN(query[key])) ? parseInt(query[key]) : query[key];
            }
            console.log('GET newQuery:', newQuery)
            readDoc.readDocuments(mongodb, newQuery, {collectionName: collectionName}, function(err, result) {
                if(!err) {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(result));
                } else {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: 'Unable to read'}));
                }
            });
            break;

        case 'POST': // Create
            var body = '';
            req.on('data', function (data) {
                body += data;
                console.log("Partial body: " + body);
            });
            req.on('end', function () {
                console.log("Body: " + body);
                try {
                    body = JSON.parse(body);
                    console.log('Data ::', body);
                    createDoc.createDocuments(mongodb, body, { collectionName: collectionName}, function(err, result) {
                        if(!err) {
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify(result));
                        } else {
                            res.writeHead(400, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify({message: 'Unable to insert'}));
                        }
                    });
                } catch(e) {
                    res.writeHead(404, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: 'Unable to parse JSON'}));
                }
            });
            break;

        case 'PUT': // Update
            break;
        case 'DELETE': // Delete
            break;
        default:
            break;
    }
});

MongoClient.connect(mongoURL, function(err, db) {
    if(!err) {
        mongodb = db;
        app.locals.mongodb = db;
        console.log("Connected to MongoDB");
        // server.listen(PORT , '192.168.8.100', function(){
        //     console.log("Server listening on: http://localhost:%s", PORT);
        // });
        app.listen(PORT, HOST_NAME);
    } else {
        db.close();
        server.close();
    }
});
