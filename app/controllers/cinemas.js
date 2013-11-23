/**
 * Cinemas Controller
 * Defines cinema related route endpoints
 * @copyright 2013 Jeremy Worboys
 */

var orm = require('orm');

var cinemas = {};
var searchable = ['name', 'suburb', 'state', 'postcode'];

cinemas.list = function listCinemas(req, res, next) {
    var conds = {};
    for (var key in req.query) {
        if (searchable.indexOf(key) === -1) continue;
        conds[key] = orm.like('%' + req.query[key] + '%');
    }

    req.models.cinema.find(conds, function(err, cinemas) {
        if (err) return next(err);

        res.json({
            status: 'success',
            data: { cinemas: cinemas }
        });
    });
};

cinemas.single = function singleCinema(req, res, next) {
    req.models.cinema.get(req.params.id, function(err, cinema) {
        if (err) return next(err);

        res.json({
            status: 'success',
            data: { cinema: cinema }
        });
    });
};

cinemas.listMovies = function listCinemaMovies(req, res, next) {
    req.models.cinema.get(req.params.id, function(err, cinema) {
        if (err) return next(err);

        cinema.getMovies(function(err, movies) {
            if (err) return next(err);

            res.json({
                status: 'success',
                data: { movies: movies }
            });
        });
    });
};


module.exports = cinemas;
