var express = require('express');
var router = express.Router();
var pool = require("../config/dbconfig");

/**
 * 회원 가입 및 로그인
 */

 /**
  * 회원가입
  * @param(name, customerID, customerPassword)
  * @returns(boolean)
  */
router.post("/membership",(req,res) =>{
  pool.getConnection((err,conn) => {
    if(err){
      throw err;
    }
    var qury = "SELECT * FROM tbCustomer WHERE cutomerID = ? ";
    conn.query(qury,[req.body.cutomerID ], ( err, raw ) => {
      if( err ) {
          throw err;
      }
      if(raw.length === 0){
         var { name, cutomerID, customerPassword } = req.body;
         var qury = "INSERT INTO tbcustomer(name, cutomerID, customerPassword ) VALUES(?,?,?)";
         conn.query(qury,[ name, cutomerID, customerPassword],(err,result) => {
           conn.release();
           if(err){
             throw err;
           }
           if(result){
             res.send(200 , {result : true})
           }else{
             res.send(400, {result : false});
           }
         });
        }else{
          conn.release();
          res.send({
            result : false
          });
        }
    });
  });
});

/**
 * 회원 로그인
 * @param(customerID ,customerPassword)
 * @returns(Array)
 */
router.post("/login",(req,res) => {
  pool.getConnection((err,conn) => {
    if(err){
      throw err;
    }
    var { cutomerID ,customerPassword } = req.body;
    var qury = "SELECT * FROM tbCustomer WHERE cutomerID=? AND customerPassword=? ";
    conn.query(qury,[cutomerID ,customerPassword],(err,raw) => {
      conn.release();
      if(err){
        throw err;
      }
      if(raw.length !== 0){
        var data = {
          cutomerID : raw[0].cutomerID,
          name : raw[0].name
        };
        res.send(data);
      }else{
        res.send(400, {result : false});
      }
    });
  });
});
module.exports = router;
