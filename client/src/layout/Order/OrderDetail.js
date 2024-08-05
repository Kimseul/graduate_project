import React from 'react'

const OrderDetail = (props) => {
     const { orderDetail } = props;

   
    return (
        <div>
            {JSON.stringify(orderDetail)}
        </div>
    )
}

export default OrderDetail