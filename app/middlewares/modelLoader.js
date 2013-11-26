/**
 * Model Loader
 * Creates connection to database and loads models
 * @copyright 2013 Jeremy Worboys
 */

var orm = require('orm');
var config = require('../config/database');
var Cinema = require('../models/cinema');
var Movie  = require('../models/movie');
var ApiClient  = require('../models/api_client');


module.exports = function(req, res, next) {

    // Create connection to database
    orm.connect(config, function(err, db) {
        if (err) return next(err);

        // Define all models
        req.models = {
            cinema: Cinema.define(db),
            movie: Movie.define(db),
            apiClient: ApiClient.define(db)
        };

        // Setup associations
        Cinema.associations(db);
        Movie.associations(db);

        next();
    });

};
