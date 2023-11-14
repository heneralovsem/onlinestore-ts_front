import React, { FC, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Modal, TextField, Button } from "@mui/material";
import cl from "./Checkout.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { IDevice } from "../../types/types";
import BasketDevice from "../BasketDevice/BasketDevice";
import { basketAPI } from "../../services/BasketService";
import { useAppSelector } from "../../hooks/redux";
import { CheckoutSchema } from "../validation/CheckoutValidation";
import { orderAPI } from "../../services/OrderService";

interface CheckoutProps {}

const Checkout: FC<CheckoutProps> = ({}) => {
  const { user } = useAppSelector((state) => state.userReducer);
  const [devices, setDevices] = useState<Array<number>>([])
  const [deleteOneBasketDevice] = basketAPI.useDeleteOneBasketDeviceMutation();
  const { data: totalPrice } = basketAPI.useFetchTotalPriceQuery(user.id);
  const { data: basketDevices } = basketAPI.useFetchAllBasketDevicesQuery(
    user?.id || 0
  );
  console.log(basketDevices)
  const [createOrder] = orderAPI.useCreateOrderMutation()
  const clearBasket = async () => {
    //@ts-ignore
    basketDevices.forEach((element) => {
      deleteOneBasketDevice(element.id);
    });
  };
  return (
    <div className={cl.modal__container}>
    <div className={cl.devices__wrapper}>
    {basketDevices?.map((basketDevice:any) => (
    <BasketDevice key={basketDevice.id} basketDevice={basketDevice} />
  ))}
  </div>
  <p>{totalPrice}</p>
  <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
      }}
      validateOnBlur
      onSubmit={(values) => {
        console.log(values);
        const orderDevices = async () => {
          
          await createOrder({
            userName: values.name,
            userPhone: values.phone,
            userEmail: values.email,
            totalPrice: totalPrice,
            devices: basketDevices,
            userId: user.id
          })
        }
        orderDevices()
        clearBasket()

      }}
      validationSchema={CheckoutSchema}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
        handleSubmit,
        dirty,
        setFieldValue,
      }) => (
        <Form onSubmit={handleSubmit} className={cl.signUp__form}>
          <div className={cl.form__userinfo}>
            <div className={cl.form__input}>
              <TextField
                id='outlined-basic'
                label='Name'
                variant='outlined'
                type='text'
                name='name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
              />
              {touched.name && errors.name && (
                <p className={cl.form__error}>{errors.name}</p>
              )}
            </div>

            <div className={cl.form__input}>
              <TextField
                id='outlined-basic'
                label='Email'
                variant='outlined'
                type='email'
                name='email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              {touched.email && errors.email && (
                <p className={cl.form__error}>{errors.email}</p>
              )}
            </div>

            <div className={cl.form__input}>
              <TextField
                id='outlined-basic'
                label='Phone'
                variant='outlined'
                type='tel'
                name='phone'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
              />
              {touched.phone && errors.phone && (
                <p className={cl.form__error}>{errors.phone}</p>
              )}
            </div>
          </div>
          <div className={cl.form__button}>
            <Button type="submit" variant="outlined">Submit</Button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
  );
};

export default Checkout;
