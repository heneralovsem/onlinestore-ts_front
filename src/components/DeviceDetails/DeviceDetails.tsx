import React, {FC, useEffect, useRef, useState} from 'react'
import { useParams } from 'react-router-dom';
import { deviceAPI } from '../../services/DeviceService';
import  cl from './DeviceDetails.module.css'
import { Button, Slide, Alert, AlertTitle } from '@mui/material';
import ReviewModal from '../ReviewModal/ReviewModal';
import { reviewAPI } from '../../services/ReviewService';
import ReviewItem from '../ReviewItem/ReviewItem';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IReview } from '../../types/types';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { basketAPI } from '../../services/BasketService';
import { popUpSlice } from '../../store/reducers/PopUpSlice';


const DeviceDetails : FC = ({}) => {
    
    const params = useParams()
    const dispatch = useAppDispatch()
    const [reviewModal, setReviewModal] = useState<boolean>(false)
    const [isReviewPresent, setIsReviewPresent] = useState<boolean>(false)
    const {user} = useAppSelector(state => state.userReducer)
    const {data: device, error, isLoading} = deviceAPI.useFetchOneDeviceQuery(params.id)
    const [createBasketDevice, {}] = basketAPI.useCreateBasketDeviceMutation()
    const {data: reviews} = reviewAPI.useFetchAllReviewsQuery(params.id)
    const myReviewRef = useRef<HTMLDivElement | null>(null)
    const {setPopUpType, setPopUpVisibility} = popUpSlice.actions
    const {popUpVisibility, popUpType} = useAppSelector((state) => state.popUpReducer)
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
    const scrollToMyReview = () => {
        myReviewRef.current?.scrollIntoView({block: 'center'})
        console.log(myReviewRef.current)
    }
    const addBasketDevice = async () => {
        await createBasketDevice({
            basketId: user.id,
            deviceId: params.id,
            price: device?.price
        })
        dispatch(setPopUpVisibility(true));
    dispatch(setPopUpType('basket'))
    setTimeout(() => {
      dispatch(setPopUpVisibility(false));
      dispatch(setPopUpType(''))
    }, 4000);
    }

    return (
        <div className={cl.device__wrapper}>
            <div className={cl.device__flex__left}>
            <div className={cl.device__img__wrapper}>
            {process.env.REACT_APP_API_URL && <img className={cl.device__img} src={process.env.REACT_APP_API_URL + device?.img} alt="s" /> }
            </div>
            <h2>Characteristics</h2>
            {device && device.info && <table className={cl.device__info__wrapper}>
                <tbody>
            {device.info?.map((info) => (
                <tr key={info.title}>
                <td>{info.title}</td>
                <td></td>
                <td>{info.description}</td>
                </tr>
            ))}
                </tbody>
            </table>}
            </div>
            <div className={cl.device__flex__right}>
                <div className={cl.device__buying}>
                <h2>{device?.name}</h2>
                <div className={cl.price__flex}>
                   <span className={cl.device__price}>{device?.price} $</span> 
                    <Button onClick={addBasketDevice} className={cl.buy__button} variant='contained' color='success' startIcon={<ShoppingCartIcon/>}>Buy</Button>
                    </div>
                </div>   
            
            {params.id && device && <ReviewModal modal={reviewModal} deviceId={+params.id} device={device} closeModal={closeReviewModal}/> }
            <div className={cl.device__reviews__wrapper}>
                <h2>Customer reviews</h2>
                {!isReviewPresent ? <Button variant='outlined' className={cl.review__button} onClick={openReviewModal}>Review</Button> : <Button variant='outlined' className={cl.review__button} onClick={scrollToMyReview}>See my review</Button> }
            {reviews?.map((review) => {
                const refProps =
                 user.id === review.userId ? {ref: myReviewRef } : {}
                 return (
                <ReviewItem key={review.id} review={review} {...refProps} />
                 )
})}
            
            </div>
            </div>
            <Slide direction="left" in={popUpVisibility && popUpType === 'basket'} mountOnEnter unmountOnExit>
        <div className={cl.popup__wrapper}>
          <div className={cl.popup}>
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <p>
                Device has been added to the basket.
              </p>
            </Alert>
          </div>
        </div>
      </Slide>
        </div>
    )

}

export default DeviceDetails;