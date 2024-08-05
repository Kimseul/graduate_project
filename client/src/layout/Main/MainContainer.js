import React from 'react';
import MainPresenter from './MainPresenter';

const MainContainer = (props) =>{
    const { user, bookList ,updatebook ,insertbook,deletebook ,insertbasket}  = props;

    return(
        <MainPresenter user={user} bookList={bookList} updatebook={updatebook} insertbook={insertbook} deletebook={deletebook}
        insertbasket={insertbasket}></MainPresenter>
    );
}
export default MainContainer
