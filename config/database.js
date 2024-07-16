const { Client } = require('pg');
const dotenv = require('dotenv');

// Config env
dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
};

const getClient = () => {
    return new Client(dbConfig);
};

module.exports = {
    getClient
};
