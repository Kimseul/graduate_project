var mysql = require('mysql');

var pool = mysql.createPool({
    host : 'ongdv.dev',
    password : '112358',
    user:'kimseul',
    database: 'bookstore'
});

module.exports = pool;