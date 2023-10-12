import React, {FC} from 'react'
import { useParams } from 'react-router-dom';
import { deviceAPI } from '../../services/DeviceService';
import  cl from './DeviceDetails.module.css'


const DeviceDetails : FC = ({}) => {
    
    const params = useParams()
    const {data: device, error, isLoading} = deviceAPI.useFetchOneDeviceQuery(params.id)
    console.log(device)

    return (
        <div>
            <div className={cl.device__img__wrapper}>
            <img className={cl.device__img} src={process.env.REACT_APP_API_URL + device?.img} alt="s" />
            </div>
            <p>{device?.name}</p>
            <span>{device?.info[0].title}</span>
            <span>{device?.info[0].description}</span>
            
        </div>
    )

}

export default DeviceDetails;