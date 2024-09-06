import React, {FC} from 'react'
import { IBasketDevice, IDevice, IOrderedDevice } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import cl from './DeviceToReview.module.css'
import { basketAPI } from '../../services/BasketService';
import { Button, Modal, Rating } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { deviceAPI } from '../../services/DeviceService';
import { reviewAPI } from '../../services/ReviewService';

interface DeviceToReviewProps {
    orderedDevice: IOrderedDevice,
}

const DeviceToReview : FC<DeviceToReviewProps> = ({orderedDevice}) => {
    const {data: device} = deviceAPI.useFetchOneDeviceQuery(orderedDevice.deviceId)
    const navigate = useNavigate()
    const getId = () => {
        navigate(`/shop/${device?.id}`)
    }
    console.log(orderedDevice)
    const {user} = useAppSelector(state => state.userReducer)
    return (
        <div className={`${cl.device__item__wrapper}`} >
             <div className={cl.device__img__wrapper}>
           {process.env.REACT_APP_API_URL && <img className={cl.device__img} src={process.env.REACT_APP_API_URL + device?.img} alt="s" /> }
           </div>
           <span className={cl.device__item__name}>{device?.name}</span>
           <Button className={cl.device__item__btn} variant='contained' onClick={getId}>Leave a review</Button>
          
        </div>
    )

}

export default DeviceToReview;