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
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { basketAPI } from "../../services/BasketService";
import BasketDevice from "../BasketDevice/BasketDevice";
import { typeSlice } from "../../store/reducers/TypeSlice";
import { brandSlice } from "../../store/reducers/BrandSlice";
import { pageSlice } from "../../store/reducers/PageSlice"; 
import ShopPagination from "../Pagination/Pagination";
// import { createDevice } from "../../http/deviceAPI";

const Shop: FC = () => {
  const limit = 5
  const {user} = useAppSelector(state => state.userReducer)
  const {selectedType} = useAppSelector(state => state.typeReducer)
  const {setType} = typeSlice.actions
  const {selectedBrand} = useAppSelector(state => state.brandReducer)
  const {setBrand} = brandSlice.actions
  const { currentPage } = useAppSelector(state => state.pageReducer)
  const dispatch = useAppDispatch()
  const { data: types, error, isLoading } = typesAPI.useFetchAllTypesQuery("");
  const [createType, {}] = typesAPI.useCreateTypeMutation();
  const { data: brands } = brandsAPI.useFetchAllBrandsQuery("");
  const [createBrand, {}] = brandsAPI.useCreateBrandMutation();
  //@ts-ignore
  const { data: devices } = deviceAPI.useFetchAllDevicesQuery({typeId: selectedType.id, brandId: selectedBrand.id, limit: limit, page: currentPage});
  console.log(devices);
  //@ts-ignore
  const {data: basketDevices} = basketAPI.useFetchAllBasketDevicesQuery(user.id)
  // const [deleteAllBasketDevices, {}] = basketAPI.useDeleteAllBasketDevicesMutation()
  const [deleteOneBasketDevice, {}] = basketAPI.useDeleteOneBasketDeviceMutation()
  const [createDevice, {}] = deviceAPI.useCreateDeviceMutation()
  const clearAllFilters = () => {
    dispatch(setType({}))
    dispatch(setBrand({}))
  }
  const clearBrandFilter = () => {
    dispatch(setBrand({}))
  }
  const clearTypeFilter = () => {
    dispatch(setType({}))
  }
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
  console.log(selectedBrand)
  console.log(selectedType)
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
    
      <div className={cl.shop__wrapper}>
        {selectedBrand.name || selectedType.name ? <div className={cl.applied__filters}>
        <p>Applied filters:</p>
        <Button variant="outlined" onClick={clearAllFilters}>Clear all</Button>
       {selectedBrand.name && <Button variant="outlined" onClick={clearBrandFilter}>{selectedBrand.name}</Button>} 
       {selectedType.name && <Button variant="outlined" onClick={clearTypeFilter}>{selectedType.name}</Button>} 
      </div> : null
        }
      
      <div className={cl.shop__flex__row}>
      <div className={cl.filters__column}>
        <div className={cl.types__column__wrapper}>
        <p>Types <span className={cl.filters__count}>{types?.length}</span></p>
        <div className={cl.types__column}>
        {types?.map((type) => (
        <TypeItem key={type.id} type={type} />
      ))}
        </div>
      </div>
      <div className={cl.brands__column__wrapper}>
        <p>Brands <span className={cl.filters__count}> {brands?.length}</span></p>
        <div className={cl.brands__column}>
        {brands?.map((brand) => (
        <BrandItem key={brand.id} brand={brand} />
      ))}
        </div>
      </div>
      </div>
      
      <div className={cl.shop__flex__column}>
      <div className={cl.devices__row}>
      {devices?.rows?.map((device: any) => (
        <DeviceItem key={device.id} device={device} />
      ))}
      </div>
      <ShopPagination limit={limit} devicesCount={devices?.count}/>
      </div>
      
      
      </div>
      </div>
      
      
      
      
  );
};

export default Shop;
