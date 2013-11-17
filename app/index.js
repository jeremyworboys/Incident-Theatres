/**
 * Incident Theatres
 * An example movie cinema guide API written in NodeJS
 * @copyright 2013 Jeremy Worboys
 */

var orm = require('orm');
var express = require('express');
var appConfig = require('./config/application');
var dbConfig = require('./config/database');
var cinemas = require('./controllers/cinemas');

// Create application
var app = module.exports = express();

// Configure application
appConfig(app);

// Define models
app.models = {};
orm.connect(dbConfig, function(err, db) {
    app.models.cinema = require('./models/cinema')(db);
});
var modelsMiddleware = function(req, res, next) {
    req.models = app.models;
    next();
};

// Define middleware stack
app.use(modelsMiddleware);
app.use(app.router);

// Define routes
app.get('/cinemas',    cinemas.list);
app.get('/cinema/:id', cinemas.single);
