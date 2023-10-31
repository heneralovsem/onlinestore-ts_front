import React, { FC, useState } from "react";
import { Modal, TextField, Button } from "@mui/material";
import cl from "./BasketModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { IDevice } from "../../types/types";
import BasketDevice from "../BasketDevice/BasketDevice";
import { basketAPI } from "../../services/BasketService";

interface BasketModalProps {
  modal: boolean;
  closeModal: () => void;
  basketDevices: Array<IDevice>
}

const BasketModal: FC<BasketModalProps> = ({
  modal,
  closeModal,
  basketDevices
}) => {
  const [deleteOneBasketDevice] = basketAPI.useDeleteOneBasketDeviceMutation()
  const clearBasket =  async ()  => {
    //@ts-ignore
   basketDevices.forEach(element => {
       deleteOneBasketDevice(element.id)
   });
  }
  return (
    <Modal open={modal} onClose={closeModal}>
      <div className={cl.modal__container}>
        <div className={cl.close__icon__wrapper}>
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </div>
        {basketDevices?.map((basketDevice:any) => (
        <BasketDevice key={basketDevice.id} basketDevice={basketDevice} />
      ))}
      <Button variant="outlined" onClick={clearBasket}>Clear</Button>
      </div>
    </Modal>
  );
};

export default BasketModal;