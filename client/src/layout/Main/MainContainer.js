import React from 'react';
import MainPresenter from './MainPresenter';

const MainContainer = (props) =>{
    const{ user } = props;

    return(
        <MainPresenter user={user}></MainPresenter>
    );
}
export default MainContainer
