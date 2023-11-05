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


const DeviceDetails : FC = ({}) => {
    
    const params = useParams()
    const [reviewModal, setReviewModal] = useState<boolean>(false)
    const [isReviewPresent, setIsReviewPresent] = useState<boolean>(false)
    const {user} = useAppSelector(state => state.userReducer)
    const {data: device, error, isLoading} = deviceAPI.useFetchOneDeviceQuery(params.id)
    const {data: reviews} = reviewAPI.useFetchAllReviewsQuery(params.id)
    
    console.log(device)
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
        <div>
            <div className={cl.device__img__wrapper}>
            {process.env.REACT_APP_API_URL && <img className={cl.device__img} src={process.env.REACT_APP_API_URL + device?.img} alt="s" /> }
            </div>
            <p>{device?.name}</p>
            {device && device.info && <div className={cl.device__info__wrapper}>
            <span>{device?.info[0].title}</span>
            <span>{device?.info[0].description}</span>
            </div>}
            {!isReviewPresent && <Button variant='outlined' onClick={openReviewModal}>Review</Button>}
            
            {params.id && <ReviewModal modal={reviewModal} deviceId={+params.id} closeModal={closeReviewModal}/> }
            {reviews?.map((review) => (
                <ReviewItem key={review.id} review={review}/>
            ))}
        </div>
    )

}

export default DeviceDetails;