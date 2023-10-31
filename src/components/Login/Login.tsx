import React, { FC, useContext, useState } from "react";
import cl from "./Login.module.css";
import { Button, TextField } from "@mui/material";
import { registration } from "../../http/userAPI";
import { login } from "../../http/userAPI";
import { userSlice } from "../../store/reducers/UserSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IUser } from "../../types/types";
// import { userAPI } from "../../services/UserService";


const Login: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    
    const {user} = useAppSelector(state => state.userReducer)
    console.log(user)
    const {setIsAuth} = userSlice.actions
    const {setUser} = userSlice.actions
    const dispatch = useAppDispatch()
    const signIn = async () => {
      try {
        const data = await registration(email, password)
        dispatch(setUser(data as IUser))
        dispatch(setIsAuth(true))
      }
      catch (e: any) {
        alert(e.response.data.message)
      }
    }
    // const [loginUser, {}] = userAPI.useLoginUserMutation()
    const logIn = async () => {
    try {
      const data = await login(email, password)
      dispatch(setUser(data as IUser))
      dispatch(setIsAuth(true))
    }
    catch (e: any) {
      alert(e.response.data.message)
    }
    
  }
  // };
  
  return (
    <div className={cl.login__wrapper}>
      <div className={cl.login__form}>
        <TextField value={email} placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
        <TextField value={password} placeholder="Password..." type="password" onChange={(e) => setPassword(e.target.value)}/>
        <Button onClick={logIn} variant="outlined">
          Login
        </Button>
        <Button onClick={signIn}>
            Registration
        </Button>
      </div>
    </div>
  );
};

export default Login;