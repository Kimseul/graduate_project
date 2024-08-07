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
        console.log('test!');
         var { name, cutomerID, customerPassword } = req.body;
         var qury = "INSERT INTO tbCustomer(name, cutomerID, customerPassword ) VALUES(?,?,?)";
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

/**
 * 회원 수정하기
 * @param(cutomerID, customerPassword,name )
 * @returns(boolean)
 */
router.put("/edit/:id",(req,res) => {
  const { cutomerID, customerPassword,name} = req.body;
  const { id } = req.params;
  console.log(req.body);
  console.log(id)
  pool.getConnection((err,conn) =>{
    if(err){
      throw err;
    }
    var sql = `UPDATE tbCustomer SET cutomerID = ?, customerPassword = ?, name = ? WHERE cutomerID =?;`;
    conn.query(sql,[ cutomerID, customerPassword,name, id ],(err,raw) =>{
      conn.release();
      if(err){
        throw err;
      }
      console.log(raw)
      if(raw){
        res.send({
          result : true
        });
      }else{
        res.send(500, {
          result:false
        });
      }
    });
  });
});

/**
 * 회원 정보 삭제
 * @param(cutomerID)
 * @returns(boolean)
 */
router.delete("/delete/:id",(req,res) =>{
  const { id } = req.params;
  pool.getConnection((err,conn) =>{
    if(err){
      throw err;
    }
    var sql = `DELETE FROM tbCustomer WHERE cutomerID =?;`;
    conn.query(sql,[ id ], (err,raw) =>{
      conn.release();
        if(err){
          throw err;
        }
        if(raw){
          res.send({
            result : true
          });
        }else{
          res.send(500,{
            result :false
          });
        }
    })
  });
});
module.exports = router;
