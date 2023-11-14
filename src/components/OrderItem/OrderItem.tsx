import React, {FC} from 'react'
import { IOrder } from '../../types/types';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import cl from './OrderItem.module.css'
import OrderedDevice from '../OrderedDevice/OrderedDevice';

interface BrandItemProps {
    order: IOrder
}

const OrderItem : FC<BrandItemProps> = ({order}) => {
    const dispatch = useAppDispatch()
    
    return (
        <div>
           <div className={cl.order__user__info}>
            <p>{order.userName}</p>
            <p>{order.userEmail}</p>
            <p>{order.userPhone}</p>
           </div>
           <div>
            {order.devices?.map((device) => (
                <OrderedDevice key={device.id} orderedDevice={device} />
            ))}
           <p>{order.totalPrice}</p>
           </div>
        </div>
    )

}

export default OrderItem;