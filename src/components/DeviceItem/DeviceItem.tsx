import React, {FC} from 'react'
import { IDevice } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import cl from './DeviceItem.module.css'
import { basketAPI } from '../../services/BasketService';
import { Button } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { deviceAPI } from '../../services/DeviceService';
import { reviewAPI } from '../../services/ReviewService';

interface DeviceItemProps {
    device: IDevice
}

const DeviceItem : FC<DeviceItemProps> = ({device}) => {
    const navigate = useNavigate()
    const getId = () => {
        navigate(`/shop/${device.id}`)
    }
    const [createBasketDevice, {}] = basketAPI.useCreateBasketDeviceMutation()
    const {user} = useAppSelector(state => state.userReducer)
    const [deleteOneDevice, {}] = deviceAPI.useDeleteOneDeviceMutation()
    const {data: avgRating} = reviewAPI.useFetchAverageRatingQuery(device.id)
    const addBasketDevice = async () => {
        await createBasketDevice({
          //@ts-ignore
          basketId: user.id,
          deviceId: device.id
        })
      }
      const deleteDevice = async () => {
        await deleteOneDevice(device.id)
      }
      console.log(device)
    return (
        <div className={cl.device__item__wrapper} >
           <p>{device.id}</p>
           <p>{device.name}</p>
           <p>{device.price}</p> 
           <p>{avgRating}</p> 
           <div onClick={getId}>
           {process.env.REACT_APP_API_URL && <img className={cl.device__img} src={process.env.REACT_APP_API_URL + device?.img} alt="s" /> }
           </div>
           <Button onClick={addBasketDevice} variant='outlined'>Add to basket</Button>
           <Button onClick={deleteDevice} variant='outlined'>Delete</Button>
        </div>
    )

}

export default DeviceItem;