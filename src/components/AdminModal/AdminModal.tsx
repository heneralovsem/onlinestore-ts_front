import React, { FC, useState } from "react";
import { Modal, TextField, Button, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from "@mui/material";
import cl from "./AdminModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { IDevice } from "../../types/types";
import { basketAPI } from "../../services/BasketService";
import { deviceAPI } from "../../services/DeviceService";
import { typesAPI } from "../../services/TypesService";
import { brandsAPI } from "../../services/BrandsService";

interface AdminModalProps {
  modal: boolean;
  setModal: (name: boolean) => void;
  

}

const AdminModal: FC<AdminModalProps> = ({
   modal,   
   setModal,
}) => {
    const [selectedCreation, setSelectedCreation] = useState<string>('')
    const [typeName, setTypeName] = useState<string>("");
    const [brandName, setBrandName] = useState<string>("");
    const [deviceModal, setDeviceModal] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [deviceName, setDeviceName] = useState<string>("");
  const [devicePrice, setDevicePrice] = useState<string>('');
  const [deviceFile, setDeviceFile] = useState(null);
  const [deviceTitle, setDeviceTitle] = useState<string>("");
  const [deviceDesc, setDeviceDesc] = useState<string>("");
  const [info, setInfo] = useState<Array<any>>([])
    const {data: types} = typesAPI.useFetchAllTypesQuery('')
    const {data: brands} = brandsAPI.useFetchAllBrandsQuery('')
    const [createDevice] = deviceAPI.useCreateDeviceMutation()
    const [createType] = typesAPI.useCreateTypeMutation()
    const [createBrand] = brandsAPI.useCreateBrandMutation()
    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    
    const removeInfo = (number:any) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key:any, value:any, number:any) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }
    const closeModal = () => {
      setModal(false)
      setBrandName('')
      setTypeName('')
      setSelectedBrand('')
      setSelectedType('')
      setDeviceName('')
      setDevicePrice('')
      setSelectedCreation('')
    }
    const selectBrandHandler = (e: SelectChangeEvent) => {
      setSelectedBrand(e.target.value)
    }
    const selectTypeHandler = (e: SelectChangeEvent) => {
      setSelectedType(e.target.value)
    }
    const checkNumber = (event: React.KeyboardEvent<HTMLInputElement>) => {
       if(Number.isNaN(+event.key) && event.key !== 'Backspace') {
        event.preventDefault();
      }
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        setDeviceFile(e.target.files?.[0]);
      };
    const addType = async () => {
        await createType({
          name: typeName,
        });
        closeModal()
      };
      const addBrand = async () => {
        await createBrand({
          name: brandName,
        });
        closeModal()
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
    closeModal()
}
  return (
        <Modal open={modal} onClose={closeModal}>
      <div>
        <div className={cl.close__icon__wrapper}>
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </div>
        {selectedCreation === 'type' ? <div className={cl.modal__container}>
        <TextField
        value={typeName}
        placeholder="Type name..."
        variant="outlined"
        onChange={(e) => setTypeName(e.target.value)}
      />
      <Button variant="outlined" onClick={addType}>
        Click
      </Button>
        </div> : selectedCreation === 'brand' ? <div className={cl.modal__container}>
        <TextField
        value={brandName}
        placeholder="Brand name..."
        variant="outlined"
        onChange={(e) => setBrandName(e.target.value)}
      />
      <Button variant="outlined" onClick={addBrand}>
        Click
      </Button>
        </div> : selectedCreation === 'device' ?
            <div className={cl.modal__container}>
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
                <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} value={devicePrice}
                  type="text"
                  placeholder="Price..."
                  className={cl.modal__input}
                  onKeyDown={checkNumber}
                  onChange={(event) => setDevicePrice(event.target.value)}
                   />
                <input
                  type="file"
                  placeholder="File..."
                  className={cl.modal__input}
                  onChange={handleFileChange}
                />
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
          : <div className={cl.modal__container}>
          <Button variant="outlined" onClick={() => setSelectedCreation('brand')}>Create brand</Button>
      <Button variant="outlined" onClick={() => setSelectedCreation('type')}>Create type</Button>
      <Button variant="outlined" onClick={() => setSelectedCreation('device')}>Create device</Button>
      </div> 
         }
        
      </div>
    </Modal>
  );
  };

export default AdminModal;