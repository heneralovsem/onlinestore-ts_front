import React, {FC, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { deviceAPI } from '../../services/DeviceService';
import  cl from './DeviceDetails.module.css'
import { Button } from '@mui/material';
import ReviewModal from '../ReviewModal/ReviewModal';
import { reviewAPI } from '../../services/ReviewService';
import ReviewItem from '../ReviewItem/ReviewItem';
import { useAppSelector } from '../../hooks/redux';
import { IReview } from '../../types/types';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const DeviceDetails : FC = ({}) => {
    
    const params = useParams()
    const [reviewModal, setReviewModal] = useState<boolean>(false)
    const [isReviewPresent, setIsReviewPresent] = useState<boolean>(false)
    const {user} = useAppSelector(state => state.userReducer)
    const {data: device, error, isLoading} = deviceAPI.useFetchOneDeviceQuery(params.id)
    const {data: reviews} = reviewAPI.useFetchAllReviewsQuery(params.id)
    
    console.log(device?.info)
    console.log(reviews)
    useEffect(() => {
        const check = () => {
           reviews?.forEach(element => {
            if (element.userId === user.id) {
                setIsReviewPresent(true)
            }
           })
        }
        check()
    }, [reviews])
    const openReviewModal = () => {
        setReviewModal(true)
    }
    const closeReviewModal = () => {
        setReviewModal(false)
    }


    return (
        <div className={cl.device__wrapper}>
            <div className={cl.device__flex__left}>
            <div className={cl.device__img__wrapper}>
            {process.env.REACT_APP_API_URL && <img className={cl.device__img} src={process.env.REACT_APP_API_URL + device?.img} alt="s" /> }
            </div>
            <h2>Characteristics</h2>
            {device && device.info && <div className={cl.device__info__wrapper}>
            {device.info?.map((info) => (
                <div>
                <span>{info.title}</span>
                <span>{info.description}</span>
                </div>
            ))}
            
            </div>}
            </div>
            <div className={cl.device__flex__right}>
                <div className={cl.device__buying}>
                <h2>{device?.name}</h2>
                <div className={cl.price__flex}>
                   <span className={cl.device__price}>{device?.price} $</span> 
                    <Button className={cl.buy__button} variant='contained' color='success' startIcon={<ShoppingCartIcon/>}>Buy</Button>
                    </div>
                </div>   
            
            {params.id && <ReviewModal modal={reviewModal} deviceId={+params.id} closeModal={closeReviewModal}/> }
            <div className={cl.device__reviews__wrapper}>
                <h2>Customer reviews</h2>
            {reviews?.map((review) => (
                <ReviewItem key={review.id} review={review}/>
            ))}
            {!isReviewPresent && <Button variant='outlined' onClick={openReviewModal}>Review</Button>}
            </div>
            </div>
        </div>
    )

}

export default DeviceDetails;