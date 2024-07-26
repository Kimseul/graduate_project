var express = require('express');
var router = express.Router();
var pool = require("../config/dbconfig");

/**
 * 책 조회
 * @return (Array)
 */
router.get('/book',(req,res) =>{
    pool.getConnection((err,conn) => {
        if(err){
            throw err;
        }
        var sql = "SELECT * FROM tBooks;";
        conn.query(sql,(err,raw) =>{
            if(err){
                  throw err;  
            }
            data = raw;
            console.log(data);
            res.send(raw);
        })
        
    })
   
});