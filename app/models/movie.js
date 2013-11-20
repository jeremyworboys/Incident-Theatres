/**
 * Movie Model
 * Interacts with the database to retrieve movie data
 * @copyright 2013 Jeremy Worboys
 */

module.exports.define = function(db) {

    return db.define('movie', {
        title:          String,
        classification: { type: 'enum', values: ['CTC', 'G', 'PG', 'M', 'MA15+', 'R18+'] },
        coverurl:       String,
        synopsis:       String,
        runtime:        Number,
        director:       String
    }, {
        table: 'movies'
    });

};

module.exports.associations = function(db) {

    db.models.movie.hasMany('cinemas', db.models.cinema, {}, { mergeTable: 'cinemas_movies' });

};
