import React, { useState } from "react";
import { numberWithComma } from "../../../util";
import "./style.css";

const OrderRegister = props => {
  const { user, orderList, insertorder} = props;
  const [address, setAddress] = useState("");
  const [postNum, setPostNum] = useState(0);
  const [detailAddress, setDetailAddress] = useState("");
  const [creaditNum, setCreaditNum] = useState("");
  const [creaditDate, setCreaditDate] = useState("");
  const [creaditkinds, setCreaditkinds] = useState("");

  const CalQTY = data => {
    let total = 0;
    data.forEach(item => {
      total = total + item.booksum;
    });
    return total;
  };
  const CalTotal = data => {
    let total = 0;
    data.forEach(item => {
      total = total + item.price * item.booksum;
    });
    return total;
  };

//   const CalPoint = data =>{
//     let point = 0;
//     data.forEach(item => {
//       point = point + item.customerPoint;
//     });
//     return point;
//   }

  const list = orderList.map(item => (
    <tr>
      <td>{item.bookName}</td>
      <td>{item.booksum}</td>
      <td>{item.booksum * item.price}</td>
      <td><input type="number" min="0" max="5" onChange={(e) =>item.star=e.target.value}/></td>
      <td><input type="number" min="0" max={user.customerPoint} onChange={(e) => item.point = e.target.value}/></td>
    </tr>
  ));

//   const handlegetPoint= () =>{
//     const bookpoint = {
//       bookPoint : CalPoint(bookList)
//     }
//     console.log(bookpoint.customerPoint);
    
//   };
  const handleRegisterOrder = () => {
    const orderID = new Date().getTime();
    const order = {
      orderNum: orderID,
      tbCustomer_ID: user.ID,
      postNum: postNum,
      address: address,
      detailAddress: detailAddress,
      creaditNum: creaditNum,
      creaditDate: creaditDate,
      creaditkinds: creaditkinds,
      totalprice: CalTotal(orderList),
    };
    console.log(order.totalprice);
    
    
    
    console.log(order);
    // inserttotalprice();
   

    const orderdetail = orderList.map(item => {
      item.tbOrders_ID = orderID;
      item.totalStock = item.booksum;
      item.tbBooks_ID = item.bookID;
      return item;
    });

    console.log(orderdetail);

    insertorder({ order: order, orderdetail: orderdetail });
  };
  return (
    <div className="order-container">
      <div className="orderinfo">
        <table>
          <tbody>
            <tr>
              <th>order</th>
              <td colSpan="3">{user.name}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>
                <input
                  type="text"
                  value={postNum}
                  placeholder="postNumber"
                  onChange={e => setPostNum(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={detailAddress}
                  placeholder="DetailAddress"
                  onChange={e => setDetailAddress(e.target.value)}
                />
              </td>

              <td>
                <input
                  type="text"
                  value={address}
                  placeholder="Address"
                  onChange={e => setAddress(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>CraditCard</th>
              <td>
                <input
                  type="text"
                  value={creaditNum}
                  placeholder="CardNumber"
                  onChange={e => setCreaditNum(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={creaditDate}
                  placeholder="카드유효기간"
                  onChange={e => setCreaditDate(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={creaditkinds}
                  placeholder="카드 종류"
                  onChange={e => setCreaditkinds(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <table>
          <caption>도서 정보</caption>
          <thead>
            <tr>
              <th>도서명</th>
              <th>수량</th>
              <th>총합</th>
              <th>별점</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
          <tfoot>
            <tr>
              <th>{CalQTY(orderList)}</th>
              <td>{numberWithComma(CalTotal(orderList))}</td>
              <th>적립금</th>
              <tb></tb>
            </tr>
          </tfoot>
        </table>

        <input
          type="button"
          value="주문하기"
          onClick={() => handleRegisterOrder()}
        />
      </div>
    </div>
  );
};

export default OrderRegister;