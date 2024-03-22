import React, {FC, forwardRef} from 'react'
import { IReview } from '../../types/types';
import {Button, Rating} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { brandSlice } from '../../store/reducers/BrandSlice';
import cl from './ReviewItem.module.css'
import { reviewAPI } from '../../services/ReviewService';

interface ReviewItemProps {
    review: IReview
    ref: HTMLDivElement | null
}

const ReviewItem :  React.ForwardRefRenderFunction<HTMLDivElement , ReviewItemProps> = ({review}, ref) => {
    const [deleteReview] = reviewAPI.useDeleteReviewMutation()
    
    const deleteReviewItem = async () => {
        await deleteReview(review.id)
    }
    console.log(ref)
    return (
        <div ref={ref} className={cl.review__item__wrapper}>
            
            <p>{review.date}</p>
            <div className={cl.rating__wrapper}>
            <Rating
              name="simple-controlled"
              max={5}
              defaultValue={0}
              size="large"
              value={review.rating}
              readOnly
            />
          </div>
            <p>{review.text}</p> 
           
           <Button onClick={deleteReviewItem} variant='outlined'>Delete</Button>
        </div>
    )

}

export default forwardRef(ReviewItem);