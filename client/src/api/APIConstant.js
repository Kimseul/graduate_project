/**
 * API 상수 정의
 */

// const BASE_URL = 'http://localhost:3001';
// const BASE_URL = 'http://10.1.213.210:8000';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default {
    //User API
    SIGNIN: BASE_URL + '/user/login', // POST
    SIGNUP: BASE_URL + '/user/membershiip', // POST

    //Book API
    GET_BOOK: BASE_URL + '/book', //GET
    REGIST_BOOK: BASE_URL + '/book/signup', //POST
    UPDATE_BOOK: BASE_URL + '/book', //PUT
    DELETE_BOOK: BASE_URL + '/book', //DELETE

    //Order API
    GET_ORDER: BASE_URL + '/order', //GET
    REGIST_ORDER: BASE_URL + '/order', //POST
    DELETE_ORDER: BASE_URL + '/order', //DELETE
    GET_ORDERDETAIL: BASE_URL + '/order/detail', //GET
    REGIST_ORDERDETAIL: BASE_URL + '/order/detail', //POST

    //Address API
    REGIST_ADDRESS: BASE_URL + '/address', //POST

    GET_CARD: BASE_URL + '/creaditcard', //GET

    // //Basket API
    // GET_BASKET: BASE_URL + '/basket/detail/list', //GET
    // REGIST_BASKET: BASE_URL + '/basket', //POST
    
}