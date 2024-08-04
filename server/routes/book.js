var express = require('express');
var router = express.Router();
var pool = require("../config/dbconfig");

/**
 * 책 조회
 * @return (Array)
 */
router.get('/list',(req,res) =>{
    pool.getConnection((err,conn) => {
        conn.release();
        if(err){
            throw err;
        }
        var sql = "SELECT * FROM tbBooks;";
        conn.query(sql,(err,raw) =>{
            if(err){
                  throw err;  
            }
            data = raw;
            //console.log(data);
            // data.map(item => {
            //     const starts = row.filter(item2 =>{
            //         return item.ID === Number(item2.tbBooks_ID);
            //     });
            // });
            res.send(raw);
        })
        
    })
   
});

module.exports = router;