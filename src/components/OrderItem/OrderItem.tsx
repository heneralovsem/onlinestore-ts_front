import React, { FC, useState } from "react";
import { IOrder } from "../../types/types";
import { Button, IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import cl from "./OrderItem.module.css";
import OrderedDevice from "../OrderedDevice/OrderedDevice";
import dayjs from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import OrderReviewModal from "../OrderReviewModal/OrderReviewModal";

interface BrandItemProps {
  order: IOrder;
}

const OrderItem: FC<BrandItemProps> = ({ order }) => {
  const dispatch = useAppDispatch();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  const openModal = () => {
    setReviewModal(true);
  };
  const closeModal = () => {
    setReviewModal(false);
  };
  const expandInfo = () => {
    setIsExpanded(!isExpanded);
  };
  console.log(order)
  return (
    <div className={cl.order}>
      {isExpanded ? (
        <div>
          <div className={cl.order__info__header}>
            <div className={cl.order__info__header__left}>
              <p className={cl.order__info__number}>Order #{order.id}</p>
              <p className={cl.order__info__date}>
                {dayjs(order.createdAt).format("DD/MM/YYYY")}
              </p>
            </div>
            <div className={cl.order__info__header__right}>
              <IconButton onClick={expandInfo}>
                <ExpandLessIcon />
              </IconButton>
            </div>
          </div>

          <div className={cl.order__info__full}>
            <div className={cl.order__info__left__full}>
              <p>{order.userName}</p>
              <p>{order.userEmail}</p>
              <p>{order.userPhone}</p>
              <Button onClick={openModal} variant="contained">Leave a review</Button>
              {order.devices && (
                <OrderReviewModal
                  modal={reviewModal}
                  closeModal={closeModal}
                  orderedDevices={order?.devices}
                />
              )}
            </div>
            <div className={cl.order__devices__full}>
              {order.devices?.map((device) => (
                <OrderedDevice
                  key={device.id}
                  orderedDevice={device}
                  isExpanded={isExpanded}
                />
              ))}
              <h3 className={cl.order__devices__total}>
                Total: {order.devices?.length} devices for {order.totalPrice} $
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <div className={cl.order__info__short}>
          <div className={cl.order__info__left}>
            <div className={cl.order__info__left__header}>
            <p className={cl.order__info__number}>Order #{order.id}</p>
            <p className={cl.order__info__date}>
              {dayjs(order.createdAt).format("DD/MM/YYYY")}
            </p>
            </div>
            <div className={cl.order__devices__short__hidden}>
            {order.devices?.map((device) => (
              <OrderedDevice
                key={device.id}
                orderedDevice={device}
                isExpanded={isExpanded}
              />
            ))}
          </div>
          </div>
          <div className={cl.order__devices__short}>
            {order.devices?.map((device) => (
              <OrderedDevice
                key={device.id}
                orderedDevice={device}
                isExpanded={isExpanded}
              />
            ))}
          </div>
          <div className={cl.order__info__right}>
            <h3 className={cl.order__info__total}>{order.totalPrice} $</h3>
            <IconButton onClick={expandInfo}>
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
