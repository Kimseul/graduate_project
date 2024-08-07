var express = require('express');
var router = express.Router();
var pool = require("../config/dbconfig");

/* 주소 조회/등록/삭제  */

/**
 * 주소 조회
 * @returns (Array)
 */
router.get('/list',(req, res) => {
  pool.getConnection((err,conn) => {
    if(err){
      throw err;
    }
    var sql = "SELECT * FROM tbAddress ";
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
 * 주소 등록하기
 * @param( address, detailAddress, addressNum)
 * @returns(boolean)
 */
router.post("/signup",(req,res) => {
  const { ID, address, detailAddress, addressNum } = req.body;
  pool.getConnection((err,conn) =>{
    if(err){
      throw err;
    }
    var sql = `INSERT INTO tbAddress(address, detailAddress, addressNum) VALUES (?,?,?) ;`;
    conn.query(sql,[ address, detailAddress, addressNum] , (err,raw) =>{
      if(err){
        throw err;
      }
      if(raw){
        var sql =`INSERT INTO
        tbCustomerAddress(ID, cutomerID)
          VALUES
          (
            (SELECT MAX(ID) FROM tbAddress ORDER BY ID DESC),?
          );`
          console.log("gbbjhbjkbhb",ID);
          
          conn.query(sql, [ID],(err, result) => {
                conn.release();
                if(err){
                    throw err;
                }
                if(result){
                    res.send({
                        result : true
                    });
                }else{
                    res.send({
                        result :false
                    });
                }
            }
          );
      }else{
        res.send({
          result : false
        });
      }
    });
  });
});


/**
 * 주소 삭제
 * @param(ID)
 * @returns(boolean)
 */
router.delete("/delete/:id",(req,res) =>{
  const { id } = req.params;
  pool.getConnection((err,conn) =>{
    if(err){
      throw err;
    }
    var sql = `DELETE FROM tbAddress WHERE ID = ?;`;
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
 * 주소 수정하기
 * @param( ID,address,detailAddress,addressNum )
 * @returns(boolean)
 */
router.put("/edit",(req,res) => {
    const {  ID,address,detailAddress,addressNum  } = req.body;
    pool.getConnection((err,conn) =>{
      if(err){
        throw err;
      }
      var sql = `UPDATE tbAddress SET address= ?,detailAddress= ?,addressNum= ? WHERE ID= ? ;`;
      conn.query(sql,[   address,detailAddress,addressNum,ID ],(err,raw) =>{
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