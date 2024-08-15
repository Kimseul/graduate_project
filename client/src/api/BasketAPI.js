import axios from 'axios';
//import APIConstant from './APIConstant'
// const BASE_URL = 'http://10.1.213.210:8000';

 const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URL = 'http://api-kimseul.ongdv.dev';

export default {
    /**
     * 장바구니 상세 불러오기
     */
    getBasket: () => {
        const url = `${BASE_URL}/basket/list`
        return axios.get(url)
    },

    /**
     * 장바구니 등록하기
     * @param { BasketID,	customerID ,Baskettime} basket
     * @김예슬 2019-10-20 14:01:14
     */
    registBasket: (basket) => {
        const url = `${BASE_URL}/basket/detail/signup`
        return axios.post(url,basket)
    },

    /**
     * 책수정하기
     * @param {  BasketID,	cutomerID ,	Baskettime} basket
     * @김예슬 2019-10-20 14:01:14
     */
    updateBasket: (basket) => {
        const url = `${BASE_URL}/basket/edit/${basket.BasketID}`
        return axios.put(url, basket)
    },

    /**
     * 책삭제하기
     * @param id
     * @김예슬 2019-10-12 14:01:14
     * axios.delete메서드에 body를 쓰려면 {data: {[value]}}를 적어줘야함.
     */
    deleteBasket: (id) => {
        const url = `${BASE_URL}/basket/detail/delete/${id.BasketID}?bookID=${id.bookID}`
        return axios.delete(url)
    }
}