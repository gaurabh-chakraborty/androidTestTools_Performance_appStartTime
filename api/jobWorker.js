const app = require( "express" )();
const server = require( "http" ).Server( app );
const bodyParser = require( "body-parser" );
const Datastore = require( "nedb" );
const async = require( "async" );

app.use( bodyParser.json() );

module.exports = app;

 
// let customerDB = new Datastore( {
//     filename: process.env.APPDATA+"/POS/server/databases/customers.db",
//     autoload: true
// } );

let jobWorkerDB = new Datastore( {
    filename: process.env.APPDATA+"/POS/server/databases/jobWorker.db",
    autoload: true
} );


jobWorkerDB.ensureIndex({ fieldName: '_id', unique: true });


app.get( "/", function ( req, res ) {
    res.send( "jobWorker API" );
} );


app.get( "/jobWorker/:jobWorkerId", function ( req, res ) {
    if ( !req.params.jobWorkerId ) {
        res.status( 500 ).send( "ID field is required." );
    } else {
        jobWorkerDB.findOne( {
            _id: req.params.jobWorkerId
        }, function ( err, jobWorker ) {
            res.send( jobWorker );
        } );
    }
} );

 
app.get( "/all", function ( req, res ) {
    jobWorkerDB.find( {}, function ( err, docs ) {
        res.send( docs );
    } );
} );

 
app.post( "/jobWorker", function ( req, res ) {
    var newjobWorker = req.body;
    jobWorkerDB.insert( newjobWorker, function ( err, jobWorker ) {
        if ( err ) res.status( 500 ).send( err );
        else res.sendStatus( 200 );
    } );
} );



app.delete( "/jobWorker/:jobWorkerId", function ( req, res ) {
    jobWorkerDB.remove( {
        _id: req.params.jobWorkerId
    }, function ( err, numRemoved ) {
        if ( err ) res.status( 500 ).send( err );
        else res.sendStatus( 200 );
    } );
} );

 

 
app.put( "/jobWorker", function ( req, res ) {
    let jobWorkerId = req.body._id;

    jobWorkerDB.update( {
        _id: jobWorkerId
    }, req.body, {}, function (
        err,
        numReplaced,
        jobWorker
    ) {
        if ( err ) res.status( 500 ).send( err );
        else res.sendStatus( 200 );
    } );
});



 