/**
 * Incident Theatres
 * An example movie cinema guide API written in NodeJS
 * @copyright 2013 Jeremy Worboys
 */

var orm = require('orm');
var ormErrors = require('orm/lib/ErrorCodes');
var express = require('express');
var appConfig = require('./config/application');
var dbConfig = require('./config/database');
var cinemas = require('./controllers/cinemas');
var movies = require('./controllers/movies');

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

// Create error handler
var errHandler = function(err, req, res, next) {
    // This is here so JSHint doesn't go off about `next` being defined but not
    // used, we can't remove it from the args though since Express uses
    // `Function.length` internally to determine that the this is an error
    // handling middleware
    if (!err) return next();

    // Coerce ORM error codes to HTTP error codes
    switch (err.code) {
    case ormErrors.NOT_FOUND:
        err.code = 404;
        break;
    }
    err.code = err.code || 500;

    res.status(err.code);
    res.json({
        status:  'error',
        code:    err.code,
        message: err.message
    });
};

// Define middleware stack
app.use(modelsMiddleware);
app.use(app.router);
app.use(errHandler);

// Define routes
app.get('/cinemas',           cinemas.list);
app.get('/cinema/:id',        cinemas.single);
app.get('/cinema/:id/movies', cinemas.listMovies);
app.get('/movies',            movies.list);
app.get('/movie/:id',         movies.single);
