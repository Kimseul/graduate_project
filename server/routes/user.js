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
    var qury = "SELECT * FROM tbcustomer WHERE customerID = ? ";
    conn.query(qury,[req.body.customerID ], ( err, raw ) => {
      if( err ) {
          throw err;
      }
      if(raw.length === 0){
         var { name, customerID, customerPassword } = req.body;
         var qury = "INSERT INTO tbcustomer(name, customerID, customerPassword ) VALUES(?,?,?)";
         conn.query(qury,[ name, customerID, customerPassword],(err,result) => {
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
    var { customerID ,customerPassword } = req.body;
    var qury = "SELECT * FROM tbcustomer, tbbasket WHERE tbcustomer.customerID = tbbasket.cutomerID AND customerID=? AND customerPassword=? ";
    conn.query(qury,[customerID ,customerPassword ],(err,raw) => {
      conn.release();
      if(err){
        throw err;
      }
      if(raw.length !== 0){
        var data = {
          ID : raw[0].customerID,
          name : raw[0].name,
          BasketID: raw[0].BasketID,
          totalprice : raw[0].totalprice
        };
        res.send(data);
      }else{
        res.send(400, {result : false});
      }
    });
  });
});
module.exports = router;
