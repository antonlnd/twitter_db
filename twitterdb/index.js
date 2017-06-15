const pg = require('pg');
var postgresURL = 'postgres://localhost/twitterdb';
var client = new pg.Client(postgresURL); 
client.connect()

module.exports = client;