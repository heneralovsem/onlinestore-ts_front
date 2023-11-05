import React, { FC, useState } from "react";
import { Modal, TextField, Button } from "@mui/material";
import cl from "./Checkout.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { IDevice } from "../../types/types";
import BasketDevice from "../BasketDevice/BasketDevice";
import { basketAPI } from "../../services/BasketService";
import { useAppSelector } from "../../hooks/redux";

interface CheckoutProps {
  
}

const Checkout: FC<CheckoutProps> = ({
  
}) => {
  const {user} = useAppSelector(state => state.userReducer)
  const [deleteOneBasketDevice] = basketAPI.useDeleteOneBasketDeviceMutation()
  const {data: totalPrice} = basketAPI.useFetchTotalPriceQuery(user.id)
  const {data: basketDevices} = basketAPI.useFetchAllBasketDevicesQuery(user?.id || 0)
  const clearBasket =  async ()  => {
    //@ts-ignore
   basketDevices.forEach(element => {
       deleteOneBasketDevice(element.id)
   });
  }
  return (
      <div className={cl.modal__container}>
        <div className={cl.devices__wrapper}>
        {basketDevices?.map((basketDevice:any) => (
        <BasketDevice key={basketDevice.id} basketDevice={basketDevice} />
      ))}
      </div>
      <p>{totalPrice}</p>
      <Button variant="outlined" onClick={clearBasket}>Confirm</Button>
      </div>
  );
};

export default Checkout;