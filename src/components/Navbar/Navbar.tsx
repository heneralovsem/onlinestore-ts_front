import React, { FC, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import cl from "./Navbar.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userSlice } from "../../store/reducers/UserSlice";

const Navbar: FC = () => {
  const [openBurger, setOpenBurger] = useState(false);
  const { user } = useAppSelector((state) => state.userReducer);
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const { setIsAuth } = userSlice.actions;
  const { setUser } = userSlice.actions;
  const dispatch = useAppDispatch();
  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setUser([{}]));
    dispatch(setIsAuth(false));
    window.location.reload();
  };
  const openNav = () => {
    setOpenBurger(!openBurger);
  };
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
            </div>
          ) : null}
        </div>

        <div className={cl.auth__links}>
          {!isAuth ? (
            <Button variant="outlined">
              <Link className={cl.button__link} to="/login">
                Log in
              </Link>
            </Button>
          ) : (
            <Button variant="outlined" onClick={logout}>
              Log out
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
