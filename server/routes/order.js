var express = require('express');
var router = express.Router();
var pool = require("../config/dbconfig");

/* 주문 조회/등록/수정/삭제  */

/**
 * 주문 조회
 * @returns (Array)
 */
router.get('/list',(req, res) => {
  pool.getConnection((err,conn) => {
    if(err){
      throw err;
    }
    var sql = "SELECT * FROM tbOrders; ";
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
 * 주문 등록하기
 * @param( orderNum,
       tbCustomer_ID,
       postNum, 
       address, 
       detailAddress, 
       creaditNum, 
       creditDate,
       creaditkinds
       )
 * @returns(boolean)
 */
router.post("/signup",(req,res) => {
  const {  
     orderNum,
    tbCustomer_ID,
    postNum, 
    address, 
    detailAddress, 
    creaditNum, 
    creaditDate,
    creaditkinds,
   } = req.body;
  pool.getConnection((err,conn) =>{
    if(err){
      throw err;
    }
    var sql = `INSERT INTO tbOrders(
      orderNum,
       tbCustomer_ID,
       postNum, 
       address, 
       detailAddress, 
       creaditNum, 
       creaditDate,
       creaditkinds
       ) VALUES (?,?,?,?,?,?,?,?)`;
    conn.query(sql,[ 
      orderNum,
      tbCustomer_ID,
      postNum, 
      address, 
      detailAddress, 
      creaditNum, 
      creaditDate,
      creaditkinds
    ] , (err,raw) =>{
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
 * 주문 수정하기
 * @param( orderNum,
    tbCustomer_ID,
    postNum ,
    address ,
    detailAddress ,
    creaditNum ,
    creaditDate  , 
    creaditkinds  )
 * @returns(boolean)
 */
router.put("/edit/:id",(req,res) => {
  const {  orderNum,
    tbCustomer_ID,
    postNum ,
    address ,
    detailAddress ,
    creaditNum ,
    creaditDate  , 
    creaditkinds  } = req.body;
  pool.getConnection((err,conn) =>{
    if(err){
      throw err;
    }
    var sql = `UPDATE tbOrders SET 
              tbCustomer_ID= ?,
              postNum =?,
              address = ?,
              detailAddress =?,
              creaditNum = ?,
              creaditDate = ?, 
              creaditkinds = ? WHERE orderNum =?`;
    conn.query(sql,[ 
      tbCustomer_ID,
      postNum ,
      address ,
      detailAddress ,
      creaditNum ,
      creaditDate  , 
      creaditkinds,
      orderNum, ],(err,raw) =>{
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

// /**
//  * 주문 삭제
//  * @param(orderNum)
//  * @returns(boolean)
//  */
// router.delete("/delete/:id",(req,res) =>{
//   const { id } = req.params;
//   pool.getConnection((err,conn) =>{
//     if(err){
//       throw err;
//     }
//     var sql = `DELETE FROM tbBooks WHERE orderNum =?;`;
//     conn.query(sql,[ id ], (err,raw) =>{
//       conn.release();
//         if(err){
//           throw err;
//         }
//         if(raw){
//           res.send({
//             result : true
//           });
//         }else{
//           res.send(500,{
//             result :false
//           });
//         }
//     })
//   });
// });

/**
 * 주문 상세 조회
 * @returns (Array)
 */
router.get('/detail/list/:id',(req, res) => {
  const { id } = req.params;
  pool.getConnection((err,conn) => {
    if(err){
      throw err;
    }
    var sql = "SELECT * FROM `tbOrderDetail`, tbBooks WHERE tbOrderDetail.tbBooks_ID = tbBooks.bookID AND tbOrderDetail.tbOrders_ID = ? ";
    conn.query(sql,[ id ],(err,raw) =>{
      conn.release();
      if(err){
        throw err;
      }
      res.send(raw);
    })
  })
});

/**
 * 주문 상세 등록
 * @param(tbOrders_ID, tbBooks_ID, totalStock)
 * @returns(boolean)
 */
router.post("/detail/signup",(req,res) => {
  const { tbOrders_ID, tbBooks_ID, totalStock,star } = req.body;
  pool.getConnection((err,conn) =>{
    if(err){
      throw err;
    }
    var sql = `INSERT INTO tborderdetail(tbOrders_ID, tbBooks_ID, totalStock,star) VALUES (?,?,?,?)`;
    conn.query(sql,[ tbOrders_ID, tbBooks_ID, totalStock,star ] , (err,raw) =>{
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
 * 주문 상세 삭제
 * @param(orderNum)
 * @returns(boolean)
 */
router.delete("/detail/delete/:id",(req,res) =>{
  const { id } = req.params;
  const { tbBooks_ID } = req.query;
  pool.getConnection((err,conn) =>{
    if(err){
      throw err;
    }
    var sql = `DELETE FROM tborderdetail WHERE tbOrders_ID =? AND tbBooks_ID =? ;`;
    conn.query(sql,[ id ,tbBooks_ID ], (err,raw) =>{
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
 * 주문 상세 수정하기
 * @param( tbOrders_ID, tbBooks_ID, totalStock)
 * @returns(boolean)
 */
router.put("/detail/edit",(req,res) => {
  const {   tbOrders_ID, tbBooks_ID, totalStock } = req.body;
  pool.getConnection((err,conn) =>{
    if(err){
      throw err;
    }
    var sql = `UPDATE tborderdetail SET tbOrders_ID= ?,tbBooks_ID= ?,totalStock= ? WHERE tbOrders_ID =? AND tbBooks_ID =?;`;
    conn.query(sql,[  tbOrders_ID, tbBooks_ID, totalStock ],(err,raw) =>{
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