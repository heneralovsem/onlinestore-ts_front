import React, {FC} from 'react'
import { IBrand } from '../../types/types';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import cl from './BrandItem.module.css'
import { orderAPI } from '../../services/OrderService';
import OrderItem from '../OrderItem/OrderItem';

interface BrandItemProps {
   
}

const Profile : FC<BrandItemProps> = () => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.userReducer)
    const {data: orders} = orderAPI.useFetchAllOrdersQuery(user.id)
    console.log(orders)
    return (
        <div>
            {orders && orders.length > 0 ? <div>
            {orders?.map((order) => (
                <OrderItem key={order.id} order={order}/>
            ))}
            </div> : <div>
                <p>You haven't ordered anything yet</p>
            </div> }
           
           
        </div>
    )

}

export default Profile;