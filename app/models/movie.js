/**
 * Movie Model
 * Interacts with the database to retrieve movie data
 * @copyright 2013 Jeremy Worboys
 */

module.exports = function(db) {

    return db.define('movie', {
        title:          String,
        classification: 'enum',
        coverurl:       String,
        synopsis:       String,
        runtime:        Number,
        director:       String
    }, {
        table: 'movies'
    });

};
