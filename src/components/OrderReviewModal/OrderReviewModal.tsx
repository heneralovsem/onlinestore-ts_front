import React, { FC, useState } from "react";
import { Modal, TextField, Button } from "@mui/material";
import cl from './OrderReviewModal.module.css'
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { IDevice, IOrderedDevice } from "../../types/types";
import BasketDevice from "../BasketDevice/BasketDevice";
import { basketAPI } from "../../services/BasketService";
import { useAppSelector } from "../../hooks/redux";
import { Link } from "react-router-dom";
import DeviceToReview from "../DeviceToReview/DeviceToReview";

interface OrderReviewModalProps {
  modal: boolean;
  closeModal: () => void;
  orderedDevices: Array<IOrderedDevice>
}

const OrderReviewModal: FC<OrderReviewModalProps> = ({
  modal,
  closeModal,
  orderedDevices
}) => {
  const {user} = useAppSelector(state => state.userReducer)
  const [deleteOneBasketDevice] = basketAPI.useDeleteOneBasketDeviceMutation()
  
  return (
    <Modal open={modal} onClose={closeModal}>
      <div className={cl.modal__container}>
        <h2 className={cl.modal__header}>Leave a review</h2>
        <div className={cl.close__icon__wrapper}>
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </div>
        {orderedDevices?.map((orderedDevice) => (
        <DeviceToReview key={orderedDevice.id} orderedDevice={orderedDevice} />
      ))}
      </div>
    </Modal>
  );
};

export default OrderReviewModal;