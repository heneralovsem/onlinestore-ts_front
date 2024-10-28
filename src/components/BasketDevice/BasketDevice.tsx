import React, {FC} from 'react'
import { IBasketDevice, IDevice } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import cl from './BasketDevice.module.css'
import { basketAPI } from '../../services/BasketService';
import { Button, Modal, IconButton } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { deviceAPI } from '../../services/DeviceService';
import DeleteIcon from '@mui/icons-material/Delete';

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
            <div className={cl.device__item__main}>
            <div className={cl.device__item__img} onClick={getId}>
           {process.env.REACT_APP_API_URL && <img className={cl.device__img} src={process.env.REACT_APP_API_URL + device?.img} alt="s" /> }
           </div>
           <p className={cl.device__item__name}>{device?.name}</p>
           </div>
           <div className={cl.device__item__right}>
           <IconButton onClick={clearBasketDevice}>
            <DeleteIcon color='error'/>
          </IconButton>
          <p>{device?.price}$</p> 
           </div>
           
           
           
        </div>
    )

}

export default BasketDevice;