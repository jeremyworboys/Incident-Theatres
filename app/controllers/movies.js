/**
 * Movies Controller
 * Defines movie related route endpoints
 * @copyright 2013 Jeremy Worboys
 */

var movies = {};

movies.list = function listMovies(req, res, next) {
    req.models.movie.find(function(err, movies) {
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


module.exports = movies;
