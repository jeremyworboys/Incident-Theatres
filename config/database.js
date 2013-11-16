/**
 * Database Configuration
 * Configuration for connecting to the database
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
