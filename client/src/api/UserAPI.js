import axios from 'axios';
// import APIConstant from './APIConstant'

const BASE_URL = 'http://localhost:3000';

export default {
    /**
     * 로그인
     */
    signIn : (user) => {
        // 
        const url = `${BASE_URL}/user/login`
        return axios.post(url, user)
    },

    /**
     * 회원가입
     */
    signUp: (user) => {
        const url = `${BASE_URL}/user/membership`
        return axios.post(url, user)
    },

    createBasket : id => {
        const url = `${BASE_URL}/basket/signup`
        return axios.post(url, { customerID : id });

    } ,


    /**
     * 누적금액 update
     */
    inserttotalprice : user =>{
        const url = `${BASE_URL}/user/edit/${user.customerID}`
        return axios.put(url, { totalprice : user.totalprice });
    },
    /**
     * 적립금액 update
     */
    insertcustomerPoint : user =>{
        const url = `${BASE_URL}/user/point/${user.customerID}`
        return axios.put(url, { customerPoint : user.customerPoint });
    },

    /**
     * 누적금액 조회
     */

     gettotalprice : user => {console.log(user);
        const url = `${BASE_URL}/user/list/${user}`
        return axios.get(url);
     }
}