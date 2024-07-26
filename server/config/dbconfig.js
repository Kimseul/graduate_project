var mysql = require('mysql');

var pool = mysql.createPool({
    host : 'ongdv.dev',
    password : 13306,
    user:'kimseul',
    database: 'bookstore'
});

module.exports = pool;