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

// Define middleware stack
var errorHandler = require('./middlewares/errorHandler');

app.use(modelsMiddleware);
app.use(app.router);
app.use(errorHandler);

// Define routes
app.get('/cinemas',           cinemas.list);
app.get('/cinema/:id',        cinemas.single);
app.get('/cinema/:id/movies', cinemas.listMovies);
app.get('/movies',            movies.list);
app.get('/movie/:id',         movies.single);
app.get('/movie/:id/cinemas', movies.listCinemas);
