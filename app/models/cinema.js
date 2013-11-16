/**
 * Cinema Model
 * Interacts with the database to retrieve cinema data
 * @copyright 2013 Jeremy Worboys
 */

module.exports = function(db) {

    return db.define('cinema', {
        name:      String,
        street1:   String,
        street2:   String,
        suburb:    String,
        state:     String,
        postcode:  String,
        latitude:  String,
        longitude: String
    }, {
        table: 'cinemas'
    });

};
