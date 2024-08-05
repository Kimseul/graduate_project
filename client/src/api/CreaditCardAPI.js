import axios from 'axios';
//import APIConstant from './APIConstant'
// const BASE_URL = 'http://10.1.213.210:8000';
const BASE_URL = 'http://localhost:4000';

export default {
    /**
     * 카드 불러오기
     */
    getCard: () => {
        const url = `${BASE_URL}/creaditcard/list`
        return axios.get(url)
    },

    /**
     * 책등록하기
     * @param { bookName, author, price, stock, url} creaditcard
     */
    registCard: (creaditcard) => {
        const url = `${BASE_URL}/creaditcard/signup`
        return axios.post(url,creaditcard)
    },

    /**
     * 책수정하기
     * @param { bookID bookName, author, price, stock, url} creaditcard
     */
    updateBook: (creaditcard) => {
        const url = `${BASE_URL}/creaditcard/edit/${creaditcard.creaditCardNum}`
        return axios.put(url, creaditcard)
    },

    /**
     * 책삭제하기
     * @param id
     * axios.delete메서드에 body를 쓰려면 {data: {[value]}}를 적어줘야함.
     */
    deleteBook: (id) => {
        const url = `${BASE_URL}/creaditcard/delete/${id}`
        return axios.delete(url)
    }
}