/**
 * Database Configuration
 * Configuration for connecting to the database
 * @copyright 2013 Jeremy Worboys
 */

module.exports = {

    database: 'incident-theatres-node',
    protocol: 'mysql',
    host: 'localhost',
    user: 'root',
    password: 'root',
    query: {
        pool: true
    }

};
