import React, { useState, useEffect } from "react";
import { BrowserRouter as Router,Route} from "react-router-dom"
import Navigation from "./component/Navigation";
import { BookAPI, UserAPI, BasketAPI, OrderAPI, CreaditCardAPI } from "./api";
import { setSession, getSession } from "./util";
import {
  MainContainer,
  BookContainer,
  BasketContainer,
  OrderContainer,
  MypageContainer
} from "./layout";
import Modal from "./component/Modal/Modal";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import AddressAPI from "./api/AddressAPI";

const App = () => {
  const [bookList, setBookList] = useState([]);
  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [user, setUser] = useState(null);
  const [basket, setBasket] = useState([]);
  const [basketlist, setBasketlist] = useState([]);
  const [order, setOrder] = useState([]);
  const [cardlist, setCardlist] = useState([]);
  const [addresslist, setAddresslist] = useState([]);

  useEffect(() => {
     const fetchData = async() => {
      await handlegetbook();
      await handlegetorder();
      await handlegetCard();
      await _getSession();
    }
    fetchData()

  }, []);

  const _getSession = async () => {
    const result = getSession("user");
    console.log(result);
    if (result !== null) {
      await setUser(result);
      await handlegetbasket(result.BasketID);
      await handlegetorder(result.ID);
      await handleGetTotalPrice(result)
    }
  };

  /**
   * 도서 조회
   */
  const handlegetbook = async () => {
    const result = await BookAPI.getBook();
    // result.data.forEach(item =>{
    //   item.price = numberWithComma(item.price);
    //   item.stock = numberWithComma(item.stock);
    // })
    setBookList(result.data);
  };

  /**
   * 도서 등록
   * @param {*} book
   */
  const handleInsertBook = async book => {
    //console.log(book);
    const result = await BookAPI.registBook(book);
    if (result.data.result) {
      alert("등록 완료");
      handlegetbook();
    }
  };

  /**
   * 도서 수정
   * @param {*} book
   */
  const handleUpdateBook = async book => {
    console.log(book);
    const result = await BookAPI.updateBook(book);
    if (result.data.result) {
      alert("수정 완료");
      handlegetbook();
    }
  };

  /**
   * 도서 삭제
   * @param {*} book
   */
  const handleDeleteBook = async book => {
    //console.log(book);
    const result = await BookAPI.deleteBook(book);
    if (result.data.result) {
      alert("삭제 완료");
      handlegetbook();
    }
  };

  /**
   * 회원 가입 등록
   */
  const handleSignUp = async user => {
    //console.log(book);
    const result = await UserAPI.signUp(user);
    if (result.data.result) {
      const basketresult = await UserAPI.createBasket(user.customerID);
      if (basketresult.data.result) {
        alert("회원가입 완료");
      }
      setSignUpModal(false);
      setSignInModal(true); //회원 가입후 로그인 창 띄우기
    }
  };

  /**
   * 누적금액 등록
   * @param {*}
   */
  const handleInsertTotalprice = async user => {
    const result = await UserAPI.inserttotalprice(user);
    console.log(result.data);
  };
   /**
   * 누적금액 등록
   * @param {*}
   */
  const handleInsertcustomerPoint = async user => {
    const result = await UserAPI.insertcustomerPoint(user);
    console.log(result.data);
  };

  /**
   * 로그인
   * @param {*} user
   */
  const handleSignIn = async user => {
    //console.log(book);
    const result = await UserAPI.signIn(user);


    if (result.status === 200) {
      alert("로그인 완료");
      await setUser(result.data);
      setSignInModal(false);
      await setSession("user", JSON.stringify(result.data));
      await handlegetbasket(result.data.BasketID);
    } else {
      alert("로그인 실패");
    }
  };

  /**
   * 장바구니 조회
   */
  const handlegetbasket = async id => {
    console.log(id);

    const result = await BasketAPI.getBasket();
    console.log(result.data);
    const newList = result.data.filter(item => {
      item.BasketID = Number(item.BasketID);
      return Number(item.BasketID) === id;
    });
    console.log(newList);
    setBasketlist(newList);
  };

  /**
   * 장바구니 상세 등록
   */

  const handleInsertBasket = async data => {
    const cond = basket.some(item => {
      return Number(item.bookID) === data.bookID;
    });
    if (cond) {
      alert("이미 장바구니에 등록된 도서");
      return;
    }

    console.log(cond);

    const basketitem = {
      BasketID: user.BasketID,
      bookID: data.bookID,
      booksum: 1
    };
    console.log(basketitem);
    const result = await BasketAPI.registBasket(basketitem);
    if (result.data.result) {
      alert("장바구니 등록 완료");
      handlegetbasket(user.BasketID);
    }
  };

  /**
   * 주문 상세 등록
   */

  const handleInsertOrder = async data => {
    const { order, orderdetail } = data;
    console.log(data);
    try {
      const result = await OrderAPI.registOrder(order);
      if (result.data.result) {
        orderdetail.forEach(async item => {
          const { tbBooks_ID } = item;
          const { BasketID } = user;

          const result2 = await OrderAPI.registOrderDetail(item);
          const result3 = await BasketAPI.deleteBasket({
            BasketID: BasketID,
            bookID: tbBooks_ID
          });
          console.log(result3);
          console.log(result2);
        });
        alert("주문 성공");
        handlegetorder(user.ID);
        handleInsertTotalprice({customerID: user.ID, totalprice: order.totalprice});
        handleInsertcustomerPoint({customerID : user.ID, customerPoint : order.customerPoint });
      _getSession()
        //console.log(result4);
      }
    } catch (error) {
      alert("주문 실패");
      console.log(error);
    }
  };
  /**
   * 총 금액 조회
   * @param {} id 
   */
  const handleGetTotalPrice = async (user) =>{
    const result4 = await UserAPI.gettotalprice(user.ID);
    console.log(result4);
    console.log(user)
    let newUser = Object.assign({}, user);
    newUser.totalprice = result4.data[0].totalprice;
    setUser(newUser)
  }
  /**
   * 주문  조회
   */
  const handlegetorder = async id => {
    console.log(id);

    const result = await OrderAPI.getOrder();
    console.log(result.data);
    const list = result.data.filter(item => {
      return item.tbCustomer_ID === id;
    });
    console.log(list);
    setOrder(list);
  };

  
  /**
   * 카드 조회
   */
  const handlegetCard = async () => {
    const result = await CreaditCardAPI.getCard();
    console.log(result.data);
    setCardlist(result.data);
  };

  /**
   * 카드 등록
   */
  const handleInsertCard = async card => {
    const result = await CreaditCardAPI.registCard(card);
    if (result.data.result) {
      alert("등록");
    }
    handlegetCard();
  };

  /**
   * 카드 삭제
   */
  const handleDeletecard = async card => {
    //console.log(book);
    const result = await CreaditCardAPI.deleteBook(card);
    if (result.data.result) {
      alert("삭제 완료");
      handlegetCard();
    }
  };

  /**
   * 주소 조회
   */
  const handlegetAddress = async () => {
    const result = await AddressAPI.getAddress();
    console.log(result.data);
    setAddresslist(result.data);
  };

  /**
   * 주소 등록
   */
  const handleInsertAddress = async address => {
    const result = await AddressAPI.registAddress(address);
    if (result.data.result) {
      alert("등록");
    }
    handlegetAddress();
  };

  /**
   * 주소 삭제
   */
  const handleDeleteAddress = async address => {
    //console.log(book);
    const result = await AddressAPI.deleteAddress(address);
    if (result.data.result) {
      alert("삭제 완료");
      handlegetAddress();
    }
  };

  return (
    <div
      style={{ width: "100%", height: window.innerHeight, overflow: "hidden" }}
    >
      <Modal active={signInModal} onCancel={setSignInModal}>
        <SignIn signIn={handleSignIn} />
      </Modal>
      <Modal active={signUpModal} onCancel={setSignUpModal}>
        <SignUp signUp={handleSignUp} />
      </Modal>
      <Router>
        <Navigation
          user={user}
          createsignIn={setSignInModal}
          createsignUp={setSignUpModal}
        />

        <div style={{ width: "100%", height: "95%", overflow: "auto" }}>
          <Route exact path="/" render={ () => (
          <MainContainer />
          )} />
          <Route
            path="/book"
            render={() => (
              <BookContainer
                user={user}
                bookList={bookList}
                updatebook={handleUpdateBook}
                insertbook={handleInsertBook}
                deletebook={handleDeleteBook}
                insertbasket={handleInsertBasket}
              />
            )}
          />
          <Route
            path="/basket"
            render={() => (
              <BasketContainer
                user={user}
                basketlist={basketlist}
                bookList={bookList}
                insertorder={handleInsertOrder}
              />
            )}
          />
          <Route
            path="/orders"
            render={() => (
              <OrderContainer user={user} order={order} bookList={bookList} />
            )}
          />
          <Route
            path="/myPage"
            render={() => (
              <MypageContainer
                user={user}
                insertcard={handleInsertCard}
                cardlist={cardlist}
                deletecard={handleDeletecard}
                addresslist={addresslist}
                insertaddress={handleInsertAddress}
              />
            )}
          />
        </div>
      </Router>
    </div>
  );
};

export default App