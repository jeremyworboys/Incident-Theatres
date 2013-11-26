/**
 * Application Routes
 * Define all application routes
 * @copyright 2013 Jeremy Worboys
 */

var cinemas = require('../controllers/cinemas');
var movies = require('../controllers/movies');


module.exports = function(app) {

    app.get('/cinemas',           cinemas.list);
    app.get('/cinema/:id',        cinemas.single);
    app.get('/cinema/:id/movies', cinemas.listMovies);

    app.get('/movies',            movies.list);
    app.get('/movie/:id',         movies.single);
    app.get('/movie/:id/cinemas', movies.listCinemas);

};
