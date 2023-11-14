import React, {FC} from 'react'
import { IBasketDevice, IDevice, IOrderedDevice } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import cl from './OrderedDevice.module.css'
import { basketAPI } from '../../services/BasketService';
import { Button, Modal } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { deviceAPI } from '../../services/DeviceService';
import { reviewAPI } from '../../services/ReviewService';

interface BasketDeviceProps {
    orderedDevice: IOrderedDevice
}

const OrderedDevice : FC<BasketDeviceProps> = ({orderedDevice}) => {
    const {data: device} = deviceAPI.useFetchOneDeviceQuery(orderedDevice.deviceId)
    const {data: avgRating} = reviewAPI.useFetchAverageRatingQuery(orderedDevice.deviceId)
    const navigate = useNavigate()
    const getId = () => {
        navigate(`/shop/${device?.id}`)
    }
    console.log(device)
    const {user} = useAppSelector(state => state.userReducer)
    return (
        <div className={cl.device__item__wrapper} >
           <p>{device?.name}</p>
           <p>{device?.price}</p> 
           <p>{avgRating}</p>
           <div onClick={getId}>
           {process.env.REACT_APP_API_URL && <img className={cl.device__img} src={process.env.REACT_APP_API_URL + device?.img} alt="s" /> }
           </div>
        </div>
    )

}

export default OrderedDevice;