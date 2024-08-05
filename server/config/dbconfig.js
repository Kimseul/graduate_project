var mysql = require('mysql');

var pool = mysql.createPool({
    host : 'ongdv.dev',
    password : '',
    user:'kimseul',
    database: 'bookstore'
});

module.exports = pool;