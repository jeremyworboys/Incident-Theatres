/**
 * Database Configuration
 * Configuration for connecting to the database
 */

module.exports = {

    database: 'incident-theatres-node',
    protocol: 'mysql',
    hostname: 'localhost',
    username: 'root',
    password: 'root',
    query: {
        pool:  true,
        debug: true
    }

};
