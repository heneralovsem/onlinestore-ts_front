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
// import { createDevice } from "../../http/deviceAPI";

const Shop: FC = () => {
  const [typeName, setTypeName] = useState<string>("");
  const [brandName, setBrandName] = useState<string>("");
  const [deviceModal, setDeviceModal] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [deviceName, setDeviceName] = useState<string>("");
  const [devicePrice, setDevicePrice] = useState<number>(0);
  const [deviceFile, setDeviceFile] = useState(null);
  const [deviceTitle, setDeviceTitle] = useState<string>("");
  const [deviceDesc, setDeviceDesc] = useState<string>("");
  const [info, setInfo] = useState<Array<any>>([])
  const {user} = useAppSelector(state => state.userReducer)
  const { data: types, error, isLoading } = typesAPI.useFetchAllTypesQuery("");
  const [createType, {}] = typesAPI.useCreateTypeMutation();
  const { data: brands } = brandsAPI.useFetchAllBrandsQuery("");
  const [createBrand, {}] = brandsAPI.useCreateBrandMutation();
  const { data: devices } = deviceAPI.useFetchAllDevicesQuery("");
  console.log(devices);
  //@ts-ignore
  const {data: basketDevices} = basketAPI.useFetchAllBasketDevicesQuery(user.id)
  const [deleteAllBasketDevices, {}] = basketAPI.useDeleteAllBasketDevicesMutation()
  const [createDevice, {}] = deviceAPI.useCreateDeviceMutation()
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    setDeviceFile(e.target.files?.[0]);
  };
  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
}

const removeInfo = (number:any) => {
    setInfo(info.filter(i => i.number !== number))
}
const changeInfo = (key:any, value:any, number:any) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
}
const selectBrandHandler = (e: SelectChangeEvent) => {
  setSelectedBrand(e.target.value)
}
const selectTypeHandler = (e: SelectChangeEvent) => {
  setSelectedType(e.target.value)
}
  const addType = async () => {
    await createType({
      name: typeName,
    });
  };
  const addBrand = async () => {
    await createBrand({
      name: brandName,
    });
  };
  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", deviceName);
    formData.append("price", `${devicePrice}`);
    if (deviceFile) {
      formData.append("img", deviceFile);
    }
    formData.append("brandId", selectedBrand);
    formData.append("typeId", selectedType);
    formData.append("info", JSON.stringify(info));
    createDevice(formData).then(data => {
      console.log(data)
    });
    // const test = JSON.stringify(info)
    // console.log(test)
    // console.log(JSON.parse(test))

  };
  const closeDeviceModal = () => {
    setDeviceModal(false);
  };
  const clearBasket =  async ()  => {
    //@ts-ignore
   await deleteAllBasketDevices(user.id)
  }
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
      <Button onClick={clearBasket} variant="outlined">Clear all</Button>
      <TextField
        value={typeName}
        placeholder="Type name..."
        variant="outlined"
        onChange={(e) => setTypeName(e.target.value)}
      />
      <Button variant="outlined" onClick={addType}>
        Click
      </Button>
      <TextField
        value={brandName}
        placeholder="Brand name..."
        variant="outlined"
        onChange={(e) => setBrandName(e.target.value)}
      />
      <Button variant="outlined" onClick={addBrand}>
        Click
      </Button>
      <Button variant="outlined" onClick={(e) => setDeviceModal(true)}>
        device modal
      </Button>
      <Modal open={deviceModal} onClose={closeDeviceModal}>
        <div className={cl.modal__container}>
          <div className={cl.close__icon__wrapper}>
            <IconButton onClick={closeDeviceModal}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className={cl.modal__content}>
            <FormControl size="small">
          <InputLabel id="demo-simple-select-helper-label">
            Select brand
          </InputLabel>
          <Select
            className={cl.modal__select}
            labelId="demo-simple-select-helper-label"
            value={selectedBrand}
            label="Select brand"
            size="small"
            onChange={selectBrandHandler}
          >{brands?.map((brand) => (
            <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
          ))}
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel id="demo-simple-select-helper-label">
            Select type
          </InputLabel>
          <Select
            className={cl.modal__select}
            labelId="demo-simple-select-helper-label"
            value={selectedType}
            label="Select type"
            size="small"
            onChange={selectTypeHandler}
          >
            {types?.map((type) => (
              <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
            <TextField
              multiline
              maxRows={4}
              fullWidth
              value={deviceName}
              placeholder="Name..."
              className={cl.modal__input}
              onChange={(event) => setDeviceName(event.target.value)}
            ></TextField>{" "}
            <TextField
              value={devicePrice}
              placeholder="Price..."
              className={cl.modal__input}
              onChange={(event) => setDevicePrice(Number(event.target.value))}
            />{" "}
            <input
              type="file"
              placeholder="File..."
              className={cl.modal__input}
              onChange={handleFileChange}
            />
            {/* <TextField
            multiline
            maxRows={4}
            fullWidth
            placeholder='File...'
            value={deviceFile}
            className={cl.modal__input}
            onChange={(event) => setDeviceFile(event.target.value)}
          ></TextField>{" "} */}
          <div>
            <Button
              className={cl.modal__btn}
              variant="outlined"
              onClick={addInfo}
            >
              Add new property
            </Button>
            </div>
            {info.map((i) => (
              <div className={cl.modal__content} key={i.number}>
                <TextField
                  value={i.title}
                  onChange={(e) =>
                    changeInfo('title', e.target.value, i.number)
                  }
                  placeholder="Property title..."
                />

                <TextField
                  value={i.description}
                  onChange={(e) =>
                    changeInfo('description', e.target.value, i.number)
                  }
                  placeholder="Propert description..."
                />
                  <div>
                <Button className={cl.modal__btn} onClick={() => removeInfo(i.number)} variant="outlined">
                  Delete
                </Button>
                </div>
              </div>
            ))}
            {/* <TextField
            multiline
            maxRows={4}
            fullWidth
            placeholder='Title...'
            value={deviceTitle}
            className={cl.modal__input}
            onChange={(event) => setDeviceTitle(event.target.value)}
          ></TextField>{" "}
          <TextField
            multiline
            maxRows={4}
            fullWidth
            placeholder='Description...'
            value={deviceDesc}
            className={cl.modal__input}
            onChange={(event) => setDeviceDesc(event.target.value)}
          ></TextField>{" "} */}
          </div>
          <div>
            <Button
              className={cl.modal__btn}
              variant="outlined"
              onClick={addDevice}
            >
              {" "}
              Add
            </Button>
          </div>
        </div>
      </Modal>
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
      {basketDevices?.map((device:any) => (
        <DeviceItem key={device.id} device={device} />
      ))}
      </div>
    </div>
  );
};

export default Shop;
