/**
 * Incident Theatres
 * An example movie cinema guide API written in NodeJS
 * @copyright 2013 Jeremy Worboys
 */

var orm = require('orm');
var express = require('express');
var appConfig = require('./config/application');
var dbConfig = require('./config/database');
var bindRoutes = require('./config/routes');
var errorHandler = require('./middlewares/errorHandler');


// Create application
var app = module.exports = express();

// Configure application
appConfig(app);

// Define models
app.models = {};
orm.connect(dbConfig, function(err, db) {
    var cinema = require('./models/cinema');
    var movie  = require('./models/movie');

    // Define all models
    app.models.cinema = cinema.define(db);
    app.models.movie  = movie.define(db);

    // Setup associations
    cinema.associations(db);
    movie.associations(db);
});
var modelsMiddleware = function(req, res, next) {
    req.models = app.models;
    next();
};
bindRoutes(app);

// Define middleware stack
app.use(modelsMiddleware);
app.use(app.router);
app.use(errorHandler);
