var mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

var pool = mysql.createPool({
    host : process.env.DATABASE_HOST,
    password : process.env.DATABASE_PW,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT
});

module.exports = pool;