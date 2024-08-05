import React, { useState} from 'react'
import { CreaditCardAPI } from '../../api';
import Modal from '../../componmet/Modal';
import CardInsert from './Carddetail';
import Addressdetail from './Address';

const MyPagePresenter = (props) => {
    const { user , insertcard ,cardlist ,deletecard ,deleteaddress,insertaddress,addresslist} = props;

    // const [modal, setModal] = useState(false)
   const [insertModal, setInsertModal] = useState(false);
   const [insertaddressModal, setInsertaddressModal] = useState(false)
 

   const list = cardlist.map(item =>(
    <tr>
        <td>{item.creditCardNum}</td>
            <td>{item.creaditcardDate}</td>
            <td>{item.creaditCardkinds} </td>
            <tb><input type="button" value="삭제" onClick={() => deletecard(item.creditCardNum)}/></tb>
    </tr>
))
const list2 = addresslist.map(item =>(
    <tr>
        <td>{item.address}</td>
            <td>{item.detailaddress}</td>
            <td>{item.addressNum} </td>
            <tb><input type="button" value="삭제" onClick={() => deleteaddress(item.ID)}/></tb>
    </tr>

        
    
))
    return (
        <div className="container">
            <div style={{width :'95%', height :'100%', margin : '0 auto', padding :'2.5% 0' }}>
                <h3>카드 목록</h3>
                <hr/>
                <div>
                    <table style={{width:'100%'}}>
                        <thead>
                            <tr >
                                <th className="table-head">카드 번호</th>
                                <th className="table-head">유효기간</th>
                                <th className="table-head">카드 종류</th>
                            </tr>
                        </thead>
                        <tbody>
                           {list}
                        </tbody>
                    </table>
                    <input type="button" value="카드 등록" onClick={() => setInsertModal(true)}/>
                    <h3>주소 목록</h3>
                    <hr/>
               
                    <table style={{width:'100%'}}>
                        <thead>
                            <tr >
                                <th className="table-head">기본 주소</th>
                                <th className="table-head">상세주소</th>
                                <th className="table-head">카드 우편번호</th>
                            </tr>
                        </thead>
                        <tbody>
                           {list2}
                        </tbody>
                    </table>
                    <input type="button" value="주소 등록" onClick={() => setInsertaddressModal(true)}/>
                    
                    <Modal active ={insertModal}  onCancel = {setInsertModal}>
                        <CardInsert user={user} insertcard={insertcard}/>
                     </Modal>
                     <Modal active ={insertaddressModal}  onCancel = {setInsertaddressModal}>
                        <Addressdetail user={user} insertaddress={insertaddress} addresslist={addresslist}/>
                     </Modal>
                </div>
            </div>
        </div>
    )
}



export default MyPagePresenter