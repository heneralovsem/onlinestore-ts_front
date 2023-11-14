import React, { FC, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {Button, IconButton} from '@mui/material'
import cl from "./Navbar.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userSlice } from "../../store/reducers/UserSlice";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { basketAPI } from "../../services/BasketService";
import BasketModal from "../BasketModal/BasketModal";
import AdminModal from "../AdminModal/AdminModal";

const Navbar: FC = () => {
  const [openBurger, setOpenBurger] = useState(false);
  const [isBasketModal, setIsBasketModal] = useState<boolean>(false)
  const [isAdminModal, setIsAdminModal] = useState<boolean>(false)
  const { user } = useAppSelector((state) => state.userReducer);
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const { setIsAuth } = userSlice.actions;
  const { setUser } = userSlice.actions;
  if (isAuth) {
    
  }
  //@ts-ignore
  const {data: basketDevices} = basketAPI.useFetchAllBasketDevicesQuery(user?.id || 0)
  const devicesQuantity = basketDevices?.length
  console.log(devicesQuantity)
  const dispatch = useAppDispatch();
  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setUser({}));
    dispatch(setIsAuth(false));
    window.location.reload();
  };
  const openNav = () => {
    setOpenBurger(!openBurger);
  };
  const openBasketModal = () => {
    setIsBasketModal(true)
  }
  const closeBasketModal = () => {
    setIsBasketModal(false)
  }
  const openAdminModal = () => {
    setIsAdminModal(true)
  }
  const closeAdminModal = () => {
    setIsAdminModal(false)
  }
  return (
    <div className={cl.menu__bg}>
      <div className={cl.menu}>
        <div className={cl.menu__links}>
          <Link className={cl.menu__link} to="/home">
            Home
          </Link>
          <Link className={cl.menu__link} to="/shop">
            Shop
          </Link>
          <Link className={cl.menu__link} to="/profile">
                Profile
              </Link>
        </div>
        <div onClick={openNav} className={cl.burger__wrapper}>
          <span className={cl.bar}></span>
          <span className={cl.bar}></span>
          <span className={cl.bar}></span>
          {openBurger ? (
            <div className={cl.burger__links}>
              <Link className={cl.menu__link} to="/home">
                Home
              </Link>
              <Link className={cl.menu__link} to="/shop">
                Shop
              </Link>
              <Link className={cl.menu__link} to="/profile">
                Profile
              </Link>
            </div>
          ) : null}
        </div>

        <div className={cl.auth__links}>
          {!isAuth ? (
            
              <Link className={cl.button__link} to="/login">
                <Button variant="outlined">Log in</Button>
              </Link>
          ) : (
            <div className={cl.auth__flex}>
              <Button variant="outlined" onClick={openAdminModal}>Admin</Button>
              <AdminModal modal={isAdminModal} setModal={setIsAdminModal}/>
              <div className={cl.icon__button__wrapper}>
                <IconButton onClick={openBasketModal}>
                  <ShoppingCartIcon color="primary"/>
                </IconButton>
                {devicesQuantity > 0 && <span className={cl.circle}>{devicesQuantity}</span>}
                <BasketModal basketDevices={basketDevices} modal={isBasketModal} closeModal={closeBasketModal} />
              </div>
            <Button variant="outlined" onClick={logout}>
              Log out
            </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
