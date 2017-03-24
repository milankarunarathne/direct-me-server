var express = require('express');
const ObjectID = require('mongodb').ObjectID;
var router = express.Router();

const readLocations = require('../db/locations/readLocations.js');

const collectionName = 'notifications';

router.get('/', function (req, res) {
    console.log('>>> GET: Locations Request');
    const mongodb = req.app.locals.mongodb;
    const query = req.query;
    const latitude = parseFloat(query.lat);
    const longitude = parseFloat(query.lon);
    const range = parseFloat(query.range);
    const damageName = query.damageName;
    console.log('GET Query', query);
    const newQuery = {
        'location.latitude': {$gte: (latitude-range), $lte:(latitude+range)},
        'location.longitude': {$gte:(longitude-range), $lte:(longitude+range)},
        'damageName': {$eq:(damageName)},
        'confirmStatus': {$eq:false}
    };



    readLocations.readLocations(mongodb, newQuery, {collectionName: collectionName}, function(err, result) {
        if(!err) {
            res.json(result);
        } else {
            res.status(500).json({message: 'Unable to read'});
        }
    });
});

router.put('/:id', function (req, res) {
    console.log('>>> PUT Notification with id:', req.params.id);
    const mongodb = req.app.locals.mongodb;
    const id = new ObjectID(req.params.id);
    const body = req.body;
    console.log('POST Body:', body);
    // Convert String number to float
    if(body.hasOwnProperty('location')) {
        body.location.latitude = parseFloat(body.location.latitude);
        body.location.longitude = parseFloat(body.location.longitude);
    }

    updateNotification.updateDocuments(mongodb, {'_id': id}, body, { collectionName: collectionName}, function(err, result) {
        if(!err) {
            res.json(result);
        } else {
            res.status(500).json({message: 'Unable to update ' + req.params.id });
        }
    });
});


module.exports = router;