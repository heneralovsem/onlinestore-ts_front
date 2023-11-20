import React, {FC} from 'react'
import { IDevice } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import cl from './DeviceItem.module.css'
import { basketAPI } from '../../services/BasketService';
import { Button, Rating } from '@mui/material';
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
          deviceId: device.id,
          price: device?.price
        })
      }
      const deleteDevice = async () => {
        await deleteOneDevice(device.id)
      }
      console.log(device)
    return (
        <div className={cl.device__item__wrapper} >
          <div onClick={getId}>
           {process.env.REACT_APP_API_URL && <img className={cl.device__img} src={process.env.REACT_APP_API_URL + device?.img} alt="s" /> }
           </div>
           <p>{device.name}</p>
           <div className={cl.rating__wrapper}>
            <Rating
              max={5}
              precision={0.1}
              defaultValue={0}
              size="large"
              value={avgRating ? +avgRating : 0} 
              readOnly
            />
          </div>
           <p>{device.price} $</p> 
           <Button onClick={addBasketDevice} variant='outlined'>Add to basket</Button>
           <Button onClick={deleteDevice} variant='outlined'>Delete</Button>
        </div>
    )

}

export default DeviceItem;