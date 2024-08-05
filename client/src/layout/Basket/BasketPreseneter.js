import React, { useState } from "react";
import "./style.css";
import { numberWithComma } from "../../util";
import Modal from "../../component/Modal/Modal";
import OrderRegister from "./component/OrderRegister";

const BasketPresneter = props => {
  const { user, basketlist, bookList, insertorder} = props;

  const [modal, setModal] = useState(false);
  // const [basketdetail, setBasketdetail] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [price, setPrice] = useState(null);

  const CalQTY = data => {
    let total = 0;
    data.forEach(item => {
      total = total + item.booksum;
    });
    return total;
  };

  /**
   * 총 금액
   * @param {*} data 
   */
  const CalTotal = data => {
    let total = 0;
    data.forEach(item => {
      total = total + item.price * item.booksum;
    });
    return total;
  };
 
  /**
   * 주문 목록 불러오기
   * @param {*} item 
   */
  const handleOrderList = item => {
    const cond = orderList.some(item2 => {
      return item2.bookID === item.bookID;
    });

    if (cond) {
      const newList = orderList.filter(items => {
        return items.bookID !== item.bookID;
      });
      setOrderList(newList);
    } else {
      setOrderList([...orderList, item]);
    }
    console.log(orderList);
  };

  const handleCheck = item => {
    const cond = orderList.some(item2 => {
      return item2.bookID === item.bookID;
    });
    return cond;
  };

  const basket =
    basketlist &&
    basketlist.map(item => {
      const newList = bookList.filter(items => {
        return Number(item.bookID) === items.bookID;
      })[0];
      console.log(newList);
      if (newList === undefined) {
        return 0;
      }
      item.bookName = newList.bookName;
      item.url = newList.url;
      item.price = newList.price;
      item.check = false;
      return item;
    });

  const list =
    basket &&
    basket.map(item => (
      <tr
        onClick={() => handleOrderList(item)}
        className={handleCheck(item) && "active"}
      >
        <td>
          <img src={item.url} alt={item.bookname} width="100" />
        </td>
        <td>{item.bookName}</td>
        <td>{item.stock}</td>
        <td>{numberWithComma(item.price)}</td>
        <td>{numberWithComma(item.booksum)}</td>
        <td>{numberWithComma(item.price * item.booksum)}</td>
      </tr>
    ));
  return (
    basketlist.length !== 0 && (
      <div className="container">
        <div
          style={{
            width: "95%",
            height: "100%",
            margin: "0 auto",
            padding: "2.5% 0"
          }}
        >
          <h3>장바구니 목록</h3>
          <hr />
          <div>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th className="table-head">이미지</th>
                  <th className="table-head">도서명</th>
                  <th className="table-head">가격</th>
                  <th className="table-head">수량</th>
                  <th className="table-head">소개</th>
                </tr>
              </thead>
              <tbody>
                {list}
                <tr>
                  <td colSpan="1">총수량</td>
                  <td>{CalQTY(basketlist)}</td>
                  <td colSpan="2">총계</td>
                  <td>{numberWithComma(CalTotal(basketlist))}</td>
                </tr>
                <tr>
                  <td colSpan="5" onClick={() => setModal(true)}>
                    주문하기
                  </td>
                </tr>
              </tbody>
            </table>
            <Modal active={modal} onCancel={setModal}>
              <OrderRegister
                user={user}
                orderList={orderList}
                insertorder={insertorder}
                bookList={bookList}
                price={setPrice}
              />
            </Modal>
          </div>
        </div>
      </div>
    )
  );
};
BasketPresneter.defaulProps = {
  basket: []
};

export default BasketPresneter;