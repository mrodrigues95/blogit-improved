require('dotenv/config');

const { Client } = require('pg');

// connect to database
const client = new Client({
    connectionString: process.env.DBCONNECTION,
});
client.connect(() => {
    console.log('Connected to database...');
});

module.exports = client;