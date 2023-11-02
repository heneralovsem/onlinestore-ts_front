import React, {FC} from 'react'
import { IReview } from '../../types/types';
import {Button, Rating} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { brandSlice } from '../../store/reducers/BrandSlice';
import cl from './ReviewItem.module.css'
import { reviewAPI } from '../../services/ReviewService';

interface BrandItemProps {
    review: IReview
}

const ReviewItem : FC<BrandItemProps> = ({review}) => {
    const [deleteReview] = reviewAPI.useDeleteReviewMutation()
    
    const deleteReviewItem = async () => {
        await deleteReview(review.id)
    }
    return (
        <div>
            <div>
            <p>{review.id}</p>
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
            </div>
           
           <Button onClick={deleteReviewItem} variant='outlined'>Delete</Button>
        </div>
    )

}

export default ReviewItem;