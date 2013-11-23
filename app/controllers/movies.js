/**
 * Movies Controller
 * Defines movie related route endpoints
 * @copyright 2013 Jeremy Worboys
 */

var orm = require('orm');

var movies = {};

movies.list = function listMovies(req, res, next) {
    var conds = {};
    var runtime = {};
    for (var key in req.query) {
        switch (key) {
        case 'title':
        case 'synopsis':
        case 'director':
            conds[key] = orm.like('%' + req.query[key] + '%');
            break;

        case 'classification':
            conds[key] = req.query[key].toUpperCase();
            break;

        case 'min-runtime':
            if (runtime['max']) {
                conds['runtime'] = orm.between(req.query[key], runtime['max']);
            } else {
                conds['runtime'] = orm.gte(req.query[key]);
            }
            runtime['min'] = req.query[key];
            break;

        case 'max-runtime':
            if (runtime['min']) {
                conds['runtime'] = orm.between(runtime['min'], req.query[key]);
            } else {
                conds['runtime'] = orm.lte(req.query[key]);
            }
            runtime['max'] = req.query[key];
            break;
        }
    }

    req.models.movie.find(conds, function(err, movies) {
        if (err) return next(err);

        res.json({
            status: 'success',
            data: { movies: movies }
        });
    });
};

movies.single = function singleMovie(req, res, next) {
    req.models.movie.get(req.params.id, function(err, movie) {
        if (err) return next(err);

        res.json({
            status: 'success',
            data: { movie: movie }
        });
    });
};

movies.listCinemas = function listMovieCinemas(req, res, next) {
    req.models.movie.get(req.params.id, function(err, movie) {
        if (err) return next(err);

        movie.getCinemas(function(err, cinemas) {
            if (err) return next(err);

            res.json({
                status: 'success',
                data: { cinemas: cinemas }
            });
        });
    });
};


module.exports = movies;
