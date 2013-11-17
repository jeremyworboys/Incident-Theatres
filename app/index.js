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
var defineModels = function(db, models) {
    models.cinema = require('./models/cinema')(db);
};

// Define middleware stack
app.use(orm.express(dbConfig, { define: defineModels }));
app.use(app.router);

// Define routes
app.get('/cinemas',    cinemas.list);
app.get('/cinema/:id', cinemas.single);
