/**
 * Application Routes
 * Define all application routes
 * @copyright 2013 Jeremy Worboys
 */

var loadModels = require('../middlewares/modelLoader');
var cinemas = require('../controllers/cinemas');
var movies = require('../controllers/movies');


module.exports = function(app) {

    app.get('/cinemas',           loadModels, cinemas.list);
    app.get('/cinema/:id',        loadModels, cinemas.single);
    app.get('/cinema/:id/movies', loadModels, cinemas.listMovies);

    app.get('/movies',            loadModels, movies.list);
    app.get('/movie/:id',         loadModels, movies.single);
    app.get('/movie/:id/cinemas', loadModels, movies.listCinemas);

};
