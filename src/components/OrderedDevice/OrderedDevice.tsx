import React, {FC} from 'react'
import { IBasketDevice, IDevice, IOrderedDevice } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import cl from './OrderedDevice.module.css'
import { basketAPI } from '../../services/BasketService';
import { Button, Modal, Rating } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { deviceAPI } from '../../services/DeviceService';
import { reviewAPI } from '../../services/ReviewService';

interface OrderedDeviceProps {
    orderedDevice: IOrderedDevice,
    isExpanded: boolean
}

const OrderedDevice : FC<OrderedDeviceProps> = ({orderedDevice, isExpanded}) => {
    const {data: device} = deviceAPI.useFetchOneDeviceQuery(orderedDevice.deviceId)
    const {data: avgRating} = reviewAPI.useFetchAverageRatingQuery(orderedDevice.deviceId)
    const navigate = useNavigate()
    const getId = () => {
        navigate(`/shop/${device?.id}`)
    }
    console.log(orderedDevice)
    const {user} = useAppSelector(state => state.userReducer)
    return (
        <div className={cl.device__item__wrapper} >
            {isExpanded ? <div>
                <div className={cl.device__img__wrapper} onClick={getId}>
           {process.env.REACT_APP_API_URL && <img className={cl.device__img} src={process.env.REACT_APP_API_URL + device?.img} alt="s" /> }
           </div>
           <h3>{device?.name}</h3>
           <Rating
              max={5}
              precision={0.1}
              defaultValue={0}
              size="medium"
              value={avgRating ? +avgRating : 0} 
              readOnly
            />
            <p>{device?.price} $</p>
            </div>   : <div className={cl.device__img__wrapper__small} onClick={getId}>
           {process.env.REACT_APP_API_URL && <img className={cl.device__img__small} src={process.env.REACT_APP_API_URL + device?.img} alt="s" /> }
           </div>}
          
        </div>
    )

}

export default OrderedDevice;