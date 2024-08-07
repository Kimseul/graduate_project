var express = require('express');
var router = express.Router();
var pool = require("../config/dbconfig");

/**
 * 책 조회
 * @return (Array)
 */
router.get('/list',(req,res) =>{
    pool.getConnection((err,conn) => {
        
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
            conn.release();
            res.send(raw);
        })
        
    })
   
});

/**
 * 책 등록하기
 * @param(bookName, author, author, price, stock, url)
 * @returns(boolean)
 */
router.post("/signup",(req,res) => {
    const {  bookName, author, price, stock, url } = req.body;
    pool.getConnection((err,conn) =>{
      if(err){
        throw err;
      }
      var sql = `INSERT INTO tbbooks( bookName, author, price, stock, url)  VALUES (?,?,?,?,?);`;
      conn.query(sql,[ bookName, author, price, stock, url] , (err,raw) =>{
        conn.release();
        if(err){
          throw err;
        }
        if(raw){
          res.send({
            result :true
          });
        }else{
          res.send({
            result : false
          });
        }
      });
    });
  });

module.exports = router;