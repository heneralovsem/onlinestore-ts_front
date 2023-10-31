import React, { FC, useState } from "react";
import { typesAPI } from "../../services/TypesService";
import TypeItem from "../TypeItem/TypeItem";
import { TextField, Button, Modal, IconButton, FormControl, MenuItem, Select, InputLabel, SelectChangeEvent } from "@mui/material";
import { brandsAPI } from "../../services/BrandsService";
import BrandItem from "../BrandItem/BrandItem";
import { deviceAPI } from "../../services/DeviceService";
import CloseIcon from "@mui/icons-material/Close";
import cl from "./Shop.module.css";
import DeviceItem from "../DeviceItem/DeviceItem";
import { useAppSelector } from "../../hooks/redux";
import { basketAPI } from "../../services/BasketService";
import BasketDevice from "../BasketDevice/BasketDevice";
// import { createDevice } from "../../http/deviceAPI";

const Shop: FC = () => {
  const {user} = useAppSelector(state => state.userReducer)
  const {selectedType} = useAppSelector(state => state.typeReducer)
  const {selectedBrand} = useAppSelector(state => state.brandReducer)
  const { data: types, error, isLoading } = typesAPI.useFetchAllTypesQuery("");
  const [createType, {}] = typesAPI.useCreateTypeMutation();
  const { data: brands } = brandsAPI.useFetchAllBrandsQuery("");
  const [createBrand, {}] = brandsAPI.useCreateBrandMutation();
  //@ts-ignore
  const { data: devices } = deviceAPI.useFetchAllDevicesQuery({typeId: selectedType.id, brandId: selectedBrand.id});
  console.log(devices);
  //@ts-ignore
  const {data: basketDevices} = basketAPI.useFetchAllBasketDevicesQuery(user.id)
  // const [deleteAllBasketDevices, {}] = basketAPI.useDeleteAllBasketDevicesMutation()
  const [deleteOneBasketDevice, {}] = basketAPI.useDeleteOneBasketDeviceMutation()
  const [createDevice, {}] = deviceAPI.useCreateDeviceMutation()
  // const addDevice = () => {
  //   const formData = new FormData();
  //   formData.append("name", deviceName);
  //   formData.append("price", `${devicePrice}`);
  //   if (deviceFile) {
  //     formData.append("img", deviceFile);
  //   }
  //   formData.append("brandId", selectedBrand);
  //   formData.append("typeId", selectedType);
  //   formData.append("info", JSON.stringify(info));
  //   createDevice(formData).then(data => {
  //     console.log(data)
  //   });
  //   // const test = JSON.stringify(info)
  //   // console.log(test)
  //   // console.log(JSON.parse(test))

  // };
  
  console.log(user)
  // @ts-ignore
  // const addBasketDevice = async () => {
  //   await createBasketDevice({
  //     //@ts-ignore
  //     basketId: user.id,
  //     deviceId: 
  //   })
  // }
  console.log(basketDevices)
  return (
    <div>
      <div>
      <div className={cl.shop__flex__row}>
      <div className={cl.types__column}>
      {types?.map((type) => (
        <TypeItem key={type.id} type={type} />
      ))}
      </div>
      <div className={cl.shop__flex__column}>
      <div className={cl.brands__row}>
      {brands?.map((brand) => (
        <BrandItem key={brand.id} brand={brand} />
      ))}
      </div>
      <div className={cl.devices__row}>
      {devices?.rows?.map((device: any) => (
        <DeviceItem key={device.id} device={device} />
      ))}
      </div>
      </div>
      </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Shop;
