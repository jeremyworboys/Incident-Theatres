/**
 * Cinemas Controller
 * Defines cinema related route endpoints
 * @copyright 2013 Jeremy Worboys
 */

var orm = require('orm');

var cinemas = {};

cinemas.list = function listCinemas(req, res, next) {
    var conds = {};
    for (var key in req.query) {
        switch (key) {
        case 'name':
        case 'suburb':
            conds[key] = orm.like('%' + req.query[key] + '%');
            break;

        case 'state':
            conds[key] = req.query[key].toUpperCase();
            break;

        case 'postcode':
            conds[key] = req.query[key];
            break;
        }
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
