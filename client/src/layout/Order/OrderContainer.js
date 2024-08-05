import React ,{useState} from 'react'
import OrderPresnter from './OrderPresenter';
import { OrderAPI } from '../../api';

const OrderContainer = (props) => {
    const { user ,order,bookList} = props;

    const [orderDetail, setOrderDetail] = useState([]);
    /**
   * 주문 상세 조회
   */
  const handlegetorderdetail = async id => {
    console.log(id);
    const result = await OrderAPI.getOrderDetail(id);
    console.log(result.data);
    setOrderDetail(result.data);
   
  };

    return (
        <div>
            <OrderPresnter order={order} user={user} bookList={bookList} getorderdetail={handlegetorderdetail} orderDetail={orderDetail} />
        </div>
    )
}

export default OrderContainer