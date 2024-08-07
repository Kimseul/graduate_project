import axios from 'axios';
//import APIConstant from './APIConstant'
// const BASE_URL = 'http://10.1.213.210:8000';
const BASE_URL = 'http://localhost:3000';

export default {
    /**
     * 주소 불러오기
     */
    getAddress: () => {
        const url = `${BASE_URL}/address/list`
        return axios.get(url)
    },

    /**
     * 책등록하기
     * @param { bookName, author, price, stock, url} book
     
     */
    registAddress: (book) => {
        const url = `${BASE_URL}/address/signup`
        return axios.post(url,book)
    },

    /**
     * 책수정하기
     * @param { bookID bookName, author, price, stock, url} book
     * 
     */
    updateAddress: (book) => {
        const url = `${BASE_URL}/address/edit/${book.bookID}`
        return axios.put(url, book)
    },

    /**
     * 책삭제하기
     * @param id
     * axios.delete메서드에 body를 쓰려면 {data: {[value]}}를 적어줘야함.
     */
    deleteAddress: (id) => {
        const url = `${BASE_URL}/address/delete/${id}`
        return axios.delete(url)
    }
}