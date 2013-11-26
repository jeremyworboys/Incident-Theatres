/**
 * Movies Controller
 * Defines movie related route endpoints
 * @copyright 2013 Jeremy Worboys
 */

var movies = {};

/**
 * List movies
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {Function} next
 */
movies.list = function listMovies(req, res, next) {
    req.models.movie.query(req.query, function(err, movies) {
        if (err) return next(err);

        res.json({
            status: 'success',
            data: { movies: movies }
        });
    });
};

/**
 * Single movie
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {Function} next
 */
movies.single = function singleMovie(req, res, next) {
    req.models.movie.get(req.params.id, function(err, movie) {
        if (err) return next(err);

        res.json({
            status: 'success',
            data: { movie: movie }
        });
    });
};

/**
 * List movie cinemas
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {Function} next
 */
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
