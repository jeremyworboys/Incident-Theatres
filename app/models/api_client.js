/**
 * API Client Model
 * Interacts with the database to retrieve API client data
 * @copyright 2013 Jeremy Worboys
 */

/**
 * Define API client model
 * @param  {Connection} db
 * @return {Model}
 */
module.exports.define = function(db) {

    var ApiClient = db.define('apiClient', {
        name:          String,
        access_token:  String,
        shared_secret: String
    }, {
        table: 'api_clients'
    });

    return ApiClient;

};
