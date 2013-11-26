/**
 * Incident Theatres
 * An example movie cinema guide API written in NodeJS
 * @copyright 2013 Jeremy Worboys
 */

var express = require('express');
var appConfig = require('./config/application');
var bindRoutes = require('./config/routes');
var errorHandler = require('./middlewares/errorHandler');


// Create application
var app = express();

// Configure application
appConfig(app);
bindRoutes(app);

// Define middleware stack
app.use(app.router);
app.use(errorHandler);

// Export application
module.exports = app;
