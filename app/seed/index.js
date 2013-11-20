
var orm = require('orm');
var async = require('async');
var dbConfig = require('../config/database');

var truncate = function(db, table, done) {
    async.series([
        async.apply(db.driver.db.query.bind(db.driver.db), 'SET FOREIGN_KEY_CHECKS = 0'),
        async.apply(db.driver.db.query.bind(db.driver.db), 'TRUNCATE TABLE ' + db.driver.query.escape(table)),
        async.apply(db.driver.db.query.bind(db.driver.db), 'SET FOREIGN_KEY_CHECKS = 1'),
    ], done);
};

module.exports.run = function(done) {
    orm.connect(dbConfig, function(err, db) {
        var cinema = require('../models/cinema').define(db);
        var movie  = require('../models/movie').define(db);

        async.series([
            // Truncate tables
            async.apply(truncate, db, 'cinemas'),
            async.apply(truncate, db, 'movies'),

            // Seed data
            async.apply(cinema.create, require('./cinemas').cinemas),
            async.apply(movie.create, require('./movies').movies),

        ], function(err) {
            if (err) console.error(err);
            db.close(done);
        });
    });
};
