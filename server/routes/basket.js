var express = require('express');
var router = express.Router();
var pool = require("../config/dbconfig");

/* 장바구니 조회/등록/수정/삭제  */

/**
 * 장바구니 조회
 * @returns (Array)
 */
router.get('/list',(req, res) => {
  pool.getConnection((err,conn) => {
    if(err){
      throw err;
    }
    var sql = "SELECT * FROM tbBasket; ";
    conn.query(sql,(err,raw) =>{
      conn.release();
      if(err){
        throw err;
      }
      res.send(raw);
    })
  })
});

/**
 * 장바구니 등록하기
 * @param( cutomerID)
 * @returns(boolean)
 */
router.post("/signup",(req,res) => {
  const {  customerID } = req.body;
  pool.getConnection((err,conn) =>{
    if(err){
      throw err;
    }
    var sql = `INSERT INTO tbBasket( cutomerID) VALUES (?);`;
    conn.query(sql,[ customerID] , (err,raw) =>{
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

/**
 * 장바구니 수정하기
 * @param( BasketID, cutomerID, Baskettime )
 * @returns(boolean)
 */
router.put("/edit",(req,res) => {
  const {  BasketID, cutomerID, Baskettime } = req.body;
  pool.getConnection((err,conn) =>{
    if(err){
      throw err;
    }
    var sql = `UPDATE tbBasket SET BasketID= ?,cutomerID = ?,Baskettime = ? WHERE BasketID= ? ;`;
    conn.query(sql,[ BasketID, cutomerID, Baskettime ],(err,raw) =>{
      conn.release();
      if(err){
        throw err;
      }
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
 * 장바구니 삭제
 * @param(BasketID)
 * @returns(boolean)
 */
router.delete("/delete/:id",(req,res) =>{
  const { id } = req.params;
  pool.getConnection((err,conn) =>{
    if(err){
      throw err;
    }
    var sql = `DELETE FROM tbBasket WHERE BasketID= ? ;`;
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

/**
 * 장바구니 상세 조회
 * @returns (Array)
 */
router.get('/detail/list',(req, res) => {
    pool.getConnection((err,conn) => {
      if(err){
        throw err;
      }
      var sql = "SELECT * FROM tbdetailBasket; ";
      conn.query(sql,(err,raw) =>{
        conn.release();
        if(err){
          throw err;
        }
        res.send(raw);
      })
    })
  });
  
  /**
   * 장바구니 상세 등록
   * @param(BasketID, bookID, booksum)
   * @returns(boolean)
   */
  router.post("/detail/signup",(req,res) => {
    const { BasketID, bookID, booksum } = req.body;
    pool.getConnection((err,conn) =>{
      if(err){
        throw err;
      }
      var sql = `INSERT INTO tbdetailBasket(BasketID, bookID, booksum) VALUES (?,?,?)`;
      conn.query(sql,[ BasketID, bookID, booksum ] , (err,raw) =>{
        conn.release();
        if(err){
          throw err;
        }
        if(raw){
          res.send({
            result :true
          })
        } else {
          res.send(500, {
            result: false
          });
        }
      });
    });
  });
  
  /**
   * 장바구니 상세 삭제
   * @param(BasketID  bookID )
   * @returns(boolean)
   */
  router.delete("/detail/delete/:id",(req,res) =>{
    const { id } = req.params;
    const { bookID  } = req.query;
    pool.getConnection((err,conn) =>{
      if(err){
        throw err;
      }
      var sql = `DELETE FROM tbdetailBasket WHERE BasketID = ? AND bookID = ?;`;
      conn.query(sql,[ id ,bookID  ], (err,raw) =>{
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
  
  /**
   * 장바구니 상세 수정하기
   * @param( tbOrders_ID, tbBooks_ID, totalStock)
   * @returns(boolean)
   */
  router.put("/detail/edit",(req,res) => {
    const {   BasketID,bookID,booksum } = req.body;
    pool.getConnection((err,conn) =>{
      if(err){
        throw err;
      }
      var sql = `UPDATE tbdetailBasket SET BasketID= ?,bookID= ?,booksum= ? WHERE BasketID = ? AND bookID = ? ;`;
      conn.query(sql,[ BasketID,bookID,booksum ],(err,raw) =>{
        conn.release();
        if(err){
          throw err;
        }
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

module.exports = router;