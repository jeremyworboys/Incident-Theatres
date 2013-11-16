/**
 * Server
 * Create a HTTP server for running the app
 * @copyright 2013 Jeremy Worboys
 */

var app = require('./app');

// Start server
app.listen(app.get('port'), function() {
    console.log('Incident Theatres');
    console.log('Application is running on http://localhost:%s', app.get('port'));
});
