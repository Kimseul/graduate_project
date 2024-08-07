import axios from "axios";
//import APIConstant from "./APIConstant";

const BASE_URL = 'http://localhost:3000';

export default {
  /**
   * 주문불러오기
   */
  getOrder: order => {
    const url = `${BASE_URL}/orders/list`
    return axios.get(url, order);
  },

  /**
   * 주문상세 불러오기
   */
  getOrderDetail: order => {
    const url = `${BASE_URL}/orders/detail/list/${order}`
    return axios.get(url, order);
  },

  /**
   * 주문 등록하기
   * @param {tbCustomer_ID,	address, detailAddress,	addressNumber} order
   */
  registOrder: order => {
    const url = `${BASE_URL}/orders/signup`
    return axios.post(url, order);
  },

  /**
   * 주문상세 등록하기
   * @param {tbOrder_ID, tbBook_ID, QTY, price} orderdetail
   */
  registOrderDetail: order => {
    const url = `${BASE_URL}/orders/detail/signup`
    return axios.post(url, order);
  },

  /**
   * 주문 삭제하기
   */
  deleteOrder: id => {
    const url = `${BASE_URL}/orders/delete`
    return axios.delete(url, { data: {  tbBooks_ID: id } });
  }
};