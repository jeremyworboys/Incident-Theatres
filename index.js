/**
 * Incident Theatres
 * An example movie cinema guide API written in NodeJS
 * @copyright 2013 Jeremy Worboys
 */

var express = require('express');

// Create application
var app = express();

// Configure application
app.set('port', 3000);

// Define middleware stack
app.use(express.logger('dev'));
app.use(app.router);

// Define routes

// Start server
app.listen(app.get('port'), function() {
    console.log('Incident Theatres');
    console.log('Application is running on http://localhost:%s', app.get('port'));
});
