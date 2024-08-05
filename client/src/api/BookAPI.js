import axios from 'axios';
//import APIConstant from './APIConstant'
// const BASE_URL = 'http://10.1.213.210:8000';
const BASE_URL = 'https://api-kimseul.ongdv.dev';

export default {
    /**
     * 책불러오기
     */
    getBook: () => {
        const url = `${BASE_URL}/book/list`
        return axios.get(url)
    },

    /**
     * 책등록하기
     * @param { bookName, author, price, stock, url} book
     */
    registBook: (book) => {
        const url = `${BASE_URL}/book/signup`
        return axios.post(url,book)
    },

    /**
     * 책수정하기
     * @param { bookID bookName, author, price, stock, url} book
     */
    updateBook: (book) => {
        const url = `${BASE_URL}/book/edit/${book.bookID}`
        return axios.put(url, book)
    },

    /**
     * 책삭제하기
     * @param id
     * axios.delete메서드에 body를 쓰려면 {data: {[value]}}를 적어줘야함.
     */
    deleteBook: (id) => {
        const url = `${BASE_URL}/book/delete/${id}`
        return axios.delete(url)
    }
}