import React, {FC} from 'react'
import { IDevice } from '../../types/types';
import { useNavigate } from 'react-router-dom';

interface DeviceItemProps {
    device: IDevice
}

const DeviceItem : FC<DeviceItemProps> = ({device}) => {
    const navigate = useNavigate()
    const getId = () => {
        navigate(`/shop/${device.id}`)
    }

    return (
        <div onClick={getId}>
           <p>{device.id}</p>
           <p>{device.name}</p>
           <p>{device.price}</p> 
           <p>{device.rating}</p> 
           <p>{device.img}</p> 
        </div>
    )

}

export default DeviceItem;