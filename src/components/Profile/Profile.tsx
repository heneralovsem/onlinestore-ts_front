import React, {FC} from 'react'
import { IBrand } from '../../types/types';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import cl from './Profile.module.css'
import { orderAPI } from '../../services/OrderService';
import OrderItem from '../OrderItem/OrderItem';
import MainLoader from '../MainLoader/MainLoader';

interface ProfileProps {
   
}

const Profile : FC<ProfileProps> = () => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.userReducer)
    const {data: orders, isLoading} = orderAPI.useFetchAllOrdersQuery(user.id)
    if (isLoading) {
        return <MainLoader/>
    }
    return (
        <div className={cl.profile__wrapper}>
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