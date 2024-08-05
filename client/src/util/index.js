/**
 * 천단위 콤마찍기
 * @param {number} x 
 */
export const numberWithComma = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * 년-월-일시:분:초
 * @param {Date} date 
 */
export const getDate = (date) => {
    // const d = new Date(date);
    // return d.getFullYear() + '-' +(d.getMonth() + 1) + '-' + d.getDate() + '(' + d.getUTCHours() +':' + d.getUTCMinutes() + ')'
    var d = new Date(date);
    var amOrPm = d.getHours() < 12 ? '오후 ' : '오전 ';
    var hour = d.getUTCHours() < 12 ? d.getUTCHours() : d.getUTCHours() - 12;
    var m = d.getUTCMinutes();
    m = m < 10 ? '0' + m : m;
    return d.getFullYear() + '년 ' + (d.getMonth()+1) + '월 ' + (d.getDate()-1) + '일 ' + amOrPm + hour + ':' + m;
};

/**
 * 
 * @param {Date} date 
 */
export const getDateOnly = (date) => {
    var d = new Date(date);
    var amOrPm = d.getHours() < 12 ? '오후 ' : '오전 ';
    var hour = d.getUTCHours() < 12 ? d.getUTCHours() : d.getUTCHours() - 12;
    var m = d.getUTCMinutes();
    m = m < 10 ? '0' + m : m;
    return amOrPm + hour + ':' + m;
};

/**
 * 세션 가져오기
 * @param {*} key 
 */
export const getSession = (key) => {
    return JSON.parse(window.sessionStorage.getItem(key));
};

/**
 * 세션 저장하기
 * @param {*} key 
 * @param {*} value 
 */
export const setSession = (key, value) => {
    window.sessionStorage.setItem(key, value);
    if(window.sessionStorage.getItem(key)) {
        return true;
    }else{
        return false;
    }
};

/**
 * 세션 클리어
 */
export const sessionClear = () => {
    window.sessionStorage.clear();
}