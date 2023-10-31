import React, {FC} from 'react'
import { IBasketDevice, IDevice } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import cl from './BasketDevice.module.css'
import { basketAPI } from '../../services/BasketService';
import { Button, Modal } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { deviceAPI } from '../../services/DeviceService';

interface BasketDeviceProps {
    basketDevice: IBasketDevice
}

const BasketDevice : FC<BasketDeviceProps> = ({basketDevice}) => {
    const {data: device} = deviceAPI.useFetchOneDeviceQuery(basketDevice.deviceId)
    const navigate = useNavigate()
    const getId = () => {
        navigate(`/shop/${device?.id}`)
    }
    console.log(device)
    const {user} = useAppSelector(state => state.userReducer)
    const [deleteOneBasketDevice, {}] = basketAPI.useDeleteOneBasketDeviceMutation()
      const clearBasketDevice = async () => {
        await deleteOneBasketDevice(basketDevice.id)
      }
    return (
        <div className={cl.device__item__wrapper} >
           <p>{device?.id}</p>
           <p>{device?.name}</p>
           <p>{device?.price}</p> 
           <p>{device?.rating}</p> 
           <div onClick={getId}>
           {process.env.REACT_APP_API_URL && <img className={cl.device__img} src={process.env.REACT_APP_API_URL + device?.img} alt="s" /> }
           </div>
           <Button onClick={clearBasketDevice} variant='outlined'>Clear one</Button>
        </div>
    )

}

export default BasketDevice;