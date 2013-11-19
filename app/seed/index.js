
var orm = require('orm');
var async = require('async');
var dbConfig = require('../config/database');

module.exports.run = function(done) {
    orm.connect(dbConfig, function(err, db) {
        var cinema = require('../models/cinema')(db);
        var movie  = require('../models/movie')(db);

        async.series([
            // Truncate tables
            cinema.clear,
            movie.clear,

            // Seed data
            async.apply(cinema.create, require('./cinemas').cinemas),
            async.apply(movie.create, require('./movies').movies),

        ], function(err) {
            if (err) console.error(err);
            db.close(done);
        });
    });
};
