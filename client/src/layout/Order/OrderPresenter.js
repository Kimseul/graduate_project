import React ,{ useState }from 'react'
import './style.css';
import Modal from '../../component/Modal/Modal';
import OrderDetail from './OrderDetail';

const OrderPresenter = (props) => {
    const {  order , getorderdetail , orderDetail} = props;
    
    const [orderdetailModal, setOrderdetailModal] = useState(false);

    const handleorderdetail = (order = null) =>{
        setOrderdetailModal(true);
        getorderdetail(order.orderNum);
        
    }

    const list = order.map(item =>(
        <tr onClick={() => {handleorderdetail(item)}}>
            <td>{item.orderNum}</td>
            <td>{item.tbCustomer_ID}</td>
            <tb>{item.address}</tb>
            
        </tr>
    ))
    return  order.lenght !== 0 &&(
        <div className="container">
            <div style={{width :'95%', height :'100%', margin : '0 auto', padding :'2.5% 0' }}>
                <h3>주문 목록 목록</h3>
                <hr/>
                <div>
                    <table style={{width:'100%'}}>
                        <thead>
                            <tr >
                                <th className="table-head">주문코드</th>
                                <th className="table-head">회원 아이디</th>
                                <th className="table-head">기본주소</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </table>
                    <Modal active={orderdetailModal} onCancel={setOrderdetailModal} >
                        < OrderDetail orderDetail={orderDetail} />
                    </Modal>
                 </div>
             </div>
        </div>
    );
}

OrderPresenter.defaulProps ={
    order :[]
}

export default OrderPresenter