import React, { FC, useEffect, useState } from "react";
import { typesAPI } from "../../services/TypesService";
import TypeItem from "../TypeItem/TypeItem";
import {
  TextField,
  Button,
  Modal,
  IconButton,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  SelectChangeEvent,
  Slide,
  Alert,
  AlertTitle,
  Drawer,
} from "@mui/material";
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
import PopUpSlice, { popUpSlice } from "../../store/reducers/PopUpSlice";
import ShopPagination from "../Pagination/Pagination";
import { IDevice } from "../../types/types";
import { Link } from "react-router-dom";
// import { createDevice } from "../../http/deviceAPI";

const Shop: FC = () => {
  const limit = 8;
  const { user } = useAppSelector((state) => state.userReducer);
  const { selectedType } = useAppSelector((state) => state.typeReducer);
  const { setType } = typeSlice.actions;
  const { selectedBrand } = useAppSelector((state) => state.brandReducer);
  const { setBrand } = brandSlice.actions;
  const { currentPage } = useAppSelector((state) => state.pageReducer);
  const { popUpVisibility } = useAppSelector((state) => state.popUpReducer);
  const { popUpType } = useAppSelector((state) => state.popUpReducer)
  const [sortingType, setSortingType] = useState<string>("createdAt");
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  const { data: types, error, isLoading } = typesAPI.useFetchAllTypesQuery("");
  const [createType, {}] = typesAPI.useCreateTypeMutation();
  const { data: brands } = brandsAPI.useFetchAllBrandsQuery("");
  const [createBrand, {}] = brandsAPI.useCreateBrandMutation();
  //@ts-ignore
  const { data: devices } = deviceAPI.useFetchAllDevicesQuery({
    typeId: selectedType.id,
    brandId: selectedBrand.id,
    limit: limit,
    page: currentPage,
    sorting: sortingType,
  });
  //@ts-ignore
  const { data: basketDevices } = basketAPI.useFetchAllBasketDevicesQuery(
    user.id
  );
  // const [deleteAllBasketDevices, {}] = basketAPI.useDeleteAllBasketDevicesMutation()
  const [deleteOneBasketDevice, {}] =
    basketAPI.useDeleteOneBasketDeviceMutation();
  const [createDevice, {}] = deviceAPI.useCreateDeviceMutation();
  const clearAllFilters = () => {
    dispatch(setType({}));
    dispatch(setBrand({}));
  };
  const clearBrandFilter = () => {
    dispatch(setBrand({}));
  };
  const clearTypeFilter = () => {
    dispatch(setType({}));
  };
  const selectHandler = (e: SelectChangeEvent) => {
    setSortingType(e.target.value);
    console.log(sortingType);
  };
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

  console.log(popUpVisibility);
  console.log(selectedBrand);
  console.log(selectedType);

  // @ts-ignore
  // const addBasketDevice = async () => {
  //   await createBasketDevice({
  //     //@ts-ignore
  //     basketId: user.id,
  //     deviceId:
  //   })
  // }
  console.log(basketDevices);
  console.log(
    devices?.rows
      ?.slice()
      ?.sort((a: IDevice, b: IDevice) => b.rating! - a.rating!)
  );
  return (
    <div className={cl.shop__wrapper}>
      <div className={cl.filters__bar}>
        <div className={cl.filters__left}>
          <div className={cl.filters__button}>
          <Button onClick={() => setShowFilters(!showFilters)} variant="contained">Filters</Button>
          </div>
          
          <p className={cl.filters__left__text}>
            {devices?.count} devices found
          </p>
        </div>
        <div className={cl.applied__sorting}>
          <FormControl size="small">
            <InputLabel id="sort-select-label">Sort by</InputLabel>
            <Select
              className={cl.sort__select}
              labelId="sort-select-label"
              value={sortingType}
              label="Sort by"
              size="small"
              onChange={selectHandler}
            >
              <MenuItem value={"rating"}>Rating</MenuItem>
              <MenuItem value={"createdAt"}>Date</MenuItem>
              <MenuItem value={"price"}>Price</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {selectedBrand.name || selectedType.name ? (
          <div className={cl.applied__filters}>
            <p className={cl.applied__filters__text}>Applied filters:</p>
            {selectedBrand.name && (
              <Button size='small' variant="outlined" onClick={clearBrandFilter}>
                {selectedBrand.name}
              </Button>
            )}
            {selectedType.name && (
              <Button size='small' variant="outlined" onClick={clearTypeFilter}>
                {selectedType.name}
              </Button>
            )}
             <Button size='small' variant="outlined" onClick={clearAllFilters}>
              Clear all
            </Button>
          </div>
        ) : null}
      <div className={cl.shop__flex__row}>
        <Drawer className={cl.filters__drawer} variant="temporary" anchor="left" open={showFilters} onClose={() => setShowFilters(false)}>
        <div className={`${cl.filters__column} ${cl.filters__column__active}`}>
          <div className={cl.types__column__wrapper}>
            <p>
              Types <span className={cl.filters__count}>{types?.length}</span>
            </p>
            <div className={cl.types__column}>
              {types?.map((type) => (
                <TypeItem key={type.id} type={type} />
              ))}
            </div>
          </div>
          <div className={cl.brands__column__wrapper}>
            <p>
              Brands{" "}
              <span className={cl.filters__count}> {brands?.length}</span>
            </p>
            <div className={cl.brands__column}>
              {brands?.map((brand) => (
                <BrandItem key={brand.id} brand={brand} />
              ))}
            </div>
          </div>
        </div>
        <div className={cl.drawer__footer}>
            <p>{devices?.count} devices found</p>
            <Button onClick={() => setShowFilters(false)} variant="contained">Show</Button>
          </div>
        </Drawer>
        <div className={cl.filters__column}>
          <div className={cl.types__column__wrapper}>
            <p>
              Types <span className={cl.filters__count}>{types?.length}</span>
            </p>
            <div className={cl.types__column}>
              {types?.map((type) => (
                <TypeItem key={type.id} type={type} />
              ))}
            </div>
          </div>
          <div className={cl.brands__column__wrapper}>
            <p>
              Brands{" "}
              <span className={cl.filters__count}> {brands?.length}</span>
            </p>
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

          <ShopPagination limit={limit} devicesCount={devices?.count} />
        </div>
      </div>
      <Slide direction="left" in={popUpVisibility && popUpType === 'checkout'} mountOnEnter unmountOnExit>
        <div className={cl.popup__wrapper}>
          <div className={cl.popup}>
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <p>
                You can check info about your order in{" "}
                <Link className={cl.checkout__link} to="/profile">
                  profile
                </Link>
                .
              </p>
            </Alert>
          </div>
        </div>
      </Slide>
      <Slide direction="left" in={popUpVisibility && popUpType === 'basket'} mountOnEnter unmountOnExit>
        <div className={cl.popup__wrapper}>
          <div className={cl.popup}>
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <p>
                Device has been added to the basket.
              </p>
            </Alert>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default Shop;
