
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

var cinemasMovies = function(db, data, cb) {
    async.each(data, function(obj, cb) {
        if (!(obj['cinemas_id'] && obj['movies_id'])) return cb();

        async.series([
            async.apply(db.models.cinema.get, obj['cinemas_id']),
            async.apply(db.models.movie.get, obj['movies_id'])
        ], function(err, results) {
            if (err) return cb(err);
            var cinema = results[0];
            var movie = results[1];

            cinema.addMovies(movie, function(err) {
                if (err) return cb(err);
                cinema.save(cb);
            });
        });
    }, cb);
};

module.exports.run = function(done) {
    orm.connect(dbConfig, function(err, db) {
        var cinema = require('../models/cinema').define(db);
        var movie  = require('../models/movie').define(db);

        require('../models/cinema').associations(db);
        require('../models/movie').associations(db);

        async.series([
            // Truncate tables
            async.apply(truncate, db, 'cinemas'),
            async.apply(truncate, db, 'movies'),
            async.apply(truncate, db, 'cinemas_movies'),

            // Seed data
            async.apply(cinema.create, require('./cinemas').cinemas),
            async.apply(movie.create, require('./movies').movies),
            async.apply(cinemasMovies, db, require('./cinemas_movies')['cinemas_movies']),

        ], function(err) {
            if (err) console.error(err);
            db.close(done);
        });
    });
};
