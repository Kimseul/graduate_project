import React from 'react'
import MyPagePresenter from './MyPagePresenter'

const MypageContainer = ( props) => {
    const { user , insertcard ,cardlist ,deletecard,deleteaddress,insertaddress,addresslist,geTotalprice} = props;
    return (
        <div>
            <MyPagePresenter user={user} insertcard={insertcard} cardlist={cardlist}  deletecard={deletecard}
            addresslist={addresslist} insertaddress={insertaddress} deleteaddress={deleteaddress}/>
        </div>
    )
}

export default MypageContainer