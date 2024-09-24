import React, { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Modal,
  TextField,
  Button,
  Alert,
  AlertTitle,
  Slide,
  Fade,
} from "@mui/material";
import cl from "./Checkout.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { IDevice } from "../../types/types";
import BasketDevice from "../BasketDevice/BasketDevice";
import { basketAPI } from "../../services/BasketService";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { popUpSlice } from "../../store/reducers/PopUpSlice";
import { CheckoutSchema } from "../validation/CheckoutValidation";
import { orderAPI } from "../../services/OrderService";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
interface CheckoutProps {}

const Checkout: FC<CheckoutProps> = ({}) => {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { setPopUpVisibility, setPopUpType } = popUpSlice.actions;
  const { popUpVisibility } = useAppSelector((state) => state.popUpReducer);
  const [devices, setDevices] = useState<Array<number>>([]);
  const [isShowPopUp, setIsShowPopUp] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(true);
  const noderef = useRef<HTMLDivElement | null>(null);
  console.log(noderef);
  const navigate = useNavigate();
  const [deleteOneBasketDevice] = basketAPI.useDeleteOneBasketDeviceMutation();
  const { data: totalPrice } = basketAPI.useFetchTotalPriceQuery(user.id);
  const { data: basketDevices } = basketAPI.useFetchAllBasketDevicesQuery(
    user?.id || 0
  );
  const [shippingCost, setShippingCost] = useState<number>(0)
  console.log(basketDevices);
  const [createOrder, { error }] = orderAPI.useCreateOrderMutation();
  const clearBasket = async () => {
    if (!error) {
      // @ts-ignore
      basketDevices.forEach((element) => {
        deleteOneBasketDevice(element.id);
      });
    }
  };
  useEffect(() => {
    const checkBasket = () => {
      if (!basketDevices.length) {
        navigate('/shop')
      }
    }
    checkBasket()
    const getShippingCost = () => {
      if (totalPrice && totalPrice < 1000) {
        setShippingCost(3)
      }
      else if (totalPrice && totalPrice > 1000) {
        setShippingCost(5)
      }
    }
  getShippingCost()
  }, [totalPrice])
  const showPopUp = () => {
    dispatch(setPopUpVisibility(true));
    dispatch(setPopUpType('checkout'))
    setTimeout(() => {
      dispatch(setPopUpVisibility(false));
      dispatch(setPopUpType(''))
    }, 10000);
  };
  console.log(error);
  return (
    <div className={cl.checkout__wrapper}>
      <h1>Checkout</h1>
      <h2>Your contacts</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
        }}
        validateOnBlur
        onSubmit={(values) => {
          console.log(values);
          const orderDevices = async () => {
            const currentDate = new Date ()
           const response = await createOrder({
              userName: values.name,
              userPhone: values.phone,
              userEmail: values.email,
              totalPrice: totalPrice,
              devices: basketDevices,
              userId: user.id,
            });
            console.log(response)
            if ('error' in response) {
              showPopUp();
            }
            else {
              clearBasket();
              navigate('/shop')
              showPopUp();
            }
            

            

            
          };
          orderDevices();
        }}
        validationSchema={CheckoutSchema}
      >
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
          <Form onSubmit={handleSubmit} className={cl.contacts__form}>
            <div className={cl.form__wrapper}>
              <main className={cl.checkout__main}>
                <div className={cl.form__input__wrapper}>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    type="text"
                    name="name"
                    className={cl.form__input}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                  />
                  {touched.name && errors.name && (
                    <p className={cl.form__error}>{errors.name}</p>
                  )}
                </div>

                <div className={cl.form__input__wrapper}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="email"
                    className={cl.form__input}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <p className={cl.form__error}>{errors.email}</p>
                  )}
                </div>

                <div className={cl.form__input__wrapper}>
                  <TextField
                    id="outlined-basic"
                    label="Phone"
                    variant="outlined"
                    type="tel"
                    name="phone"
                    className={cl.form__input}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                  />
                  {touched.phone && errors.phone && (
                    <p className={cl.form__error}>{errors.phone}</p>
                  )}
                </div>
                {basketDevices && basketDevices.length > 0 && (
                  <div className={cl.devices__wrapper}>
                    {basketDevices?.map((basketDevice: any) => (
                      <BasketDevice
                        key={basketDevice.id}
                        basketDevice={basketDevice}
                      />
                    ))}
                  </div>
                )}
              </main>
              <aside className={cl.checkout__aside}>
                <h2>Total</h2>
                <p>
                  {basketDevices?.length} devices for {totalPrice}$
                </p>
                <p>
                Shipping:  {shippingCost}$
                </p>
                <p>Total price: {totalPrice ? totalPrice + shippingCost : 0}$</p>
                <Button color="success" type="submit" variant="contained">
                  Submit
                </Button>
              </aside>
            </div>
          </Form>
        )}
      </Formik>
      {error && (
        <Slide direction="left" in={popUpVisibility} mountOnEnter unmountOnExit>
          <div className={cl.popup__wrapper}>
            <div className={cl.popup}>
              <Alert color="error">
                <AlertTitle>Error</AlertTitle>
                <p>An error has occured. Please try again.</p>
              </Alert>
            </div>
          </div>
        </Slide>
      )}
    </div>
  );
};

export default Checkout;
