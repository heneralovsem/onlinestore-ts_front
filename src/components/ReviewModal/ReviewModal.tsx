import React, { FC, useState } from "react";
import { Modal, TextField, Button, Rating } from "@mui/material";
import cl from "./ReviewModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { IDevice } from "../../types/types";
import BasketDevice from "../BasketDevice/BasketDevice";
import { basketAPI } from "../../services/BasketService";
import { reviewAPI } from "../../services/ReviewService";
import { useAppSelector } from "../../hooks/redux";
import dayjs from "dayjs";
import { deviceAPI } from "../../services/DeviceService";

interface ReviewModalProps {
  modal: boolean;
  closeModal: () => void;
  deviceId?: number;
  device: IDevice
}

const ReviewModal: FC<ReviewModalProps> = ({
  modal,
  closeModal,
  deviceId,
  device
}) => {
    const [rating, setRating] = useState<number | null>(0)
    const [textValue, setTextValue] = useState<string>('')
    const {user} = useAppSelector(state => state.userReducer)
    const [createReview] = reviewAPI.useCreateReviewMutation()
    const {data: avgRating, isLoading} = reviewAPI.useFetchAverageRatingQuery(deviceId)
    const [updateDeviceRating] = deviceAPI.useUpdateDeviceRatingMutation()
    const {data: reviews} = reviewAPI.useFetchAllReviewsQuery(deviceId)
    console.log(reviews)
    const updateRating = async () => {
      
    }
    const sendReview = async () => {
      if (rating && rating > 0 && textValue.trim() !== '' ) {
      const currentDate = new Date ();

      await createReview({
        rating: rating,
        text: textValue,
        date: dayjs(currentDate).format('DD.MM.YY'),
        deviceId: deviceId,
        userId: user.id
      })
      let sum = rating!
      console.log(sum)
      let newAvgRating
      if (reviews && reviews.length > 0) {
        reviews?.forEach(review => {
          sum+= review?.rating!
        })
        newAvgRating = sum / (1 + reviews?.length)
        console.log(newAvgRating)
        newAvgRating = newAvgRating.toFixed(1)
        console.log(sum)
        console.log(reviews.length)
        
      }
      else {
        console.log('yep')
        newAvgRating = rating!.toFixed(1)
      }
      
      
      console.log(newAvgRating)
      await  updateDeviceRating({
        rating: +newAvgRating,
        id: deviceId
      })
      
   
    
     
     
    }
    }
  
  return (
    <Modal open={modal} onClose={closeModal}>
      <div className={cl.modal__container}>
        <div className={cl.close__icon__wrapper}>
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={cl.rating__wrapper}>
            <Rating
              name="simple-controlled"
              max={5}
              defaultValue={0}
              size="large"
              value={rating}
              onChange={(event, newValue ) => setRating(newValue)}
            />
          </div>
          <div>
          <TextField variant="outlined" value={textValue} placeholder="Your review..." onChange={(e) => setTextValue(e.target.value) }/>
      <Button variant="outlined" onClick={sendReview}>Send</Button>
      </div>
      </div>
    </Modal>
  );
};

export default ReviewModal;