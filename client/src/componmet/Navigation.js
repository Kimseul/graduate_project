import React,{ Component , useState } from "react";
import { Link } from 'react-router-dom'
import {sessionClear } from '../util'
import './style.css';
import { FaBookOpen } from "react-icons/fa";


class Navigation extends Component {
    //logout function
    logout = () =>{
        sessionClear();
        window.location.reload();
    }

    render(){
        const { user } = this.props;
        const { createsignIn,createsignUp} = this.props;
        return(
            <div style={{width:'100%',height:'5%',borderBottom: '1px solid black',display :'flex',flexDirection:'row'}}>
                <div style={{width:'13%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <FaBookOpen>
                    <i className="material-icons">
                        collections_bookmark
                    </i>
                    </FaBookOpen>
                    BookStore

                    
                </div>
                <div style={{width :'10%',display:'flex',alignContent:'center',justifyContent:'center'}}>
                    <input type="search" placeholder="검색어를 입력하세요."></input>
                    <button value="submit">search</button>
                </div>
                
                <div style={{width :'75%',display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                    {/* <div>
                        <Link to=''>도서</Link>
                    </div> */}
                    {user === null ?
                    (
                        <>
                            <div className="menu-item">
                                <Link onClick={()=> createsignIn(true)}>로그인</Link>
                            </div>
                            <div className="menu-item">
                                <Link onClick={()=> createsignUp(true)}>회원가입</Link>
                            </div>
                        </>
                    ):(
                        <>
                            <div className="menu-item">
                                <Link to="">마이페이지</Link>
                            </div>
                            <div className="menu-item">
                                <Link to="">장바구니</Link>
                            </div>
                            <div className="menu-item">
                                <Link onClick={()=> this.logout()}>로그아웃</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

Navigation.defaultProps = {
    user :null
}

export default Navigation;