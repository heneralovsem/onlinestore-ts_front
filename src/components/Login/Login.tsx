import React, { FC, useContext, useState } from "react";
import cl from "./Login.module.css";
import { Button, TextField } from "@mui/material";
import { registration } from "../../http/userAPI";
import { login } from "../../http/userAPI";
import { useLocation, Link } from "react-router-dom";
import { userSlice } from "../../store/reducers/UserSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IUser } from "../../types/types";
import { Formik, Form } from "formik";
import { SignUpSchema } from "../validation/SignUpValidation";
// import { userAPI } from "../../services/UserService";


const Login: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    
    const {user} = useAppSelector(state => state.userReducer)
    console.log(user)
    const {setIsAuth} = userSlice.actions
    const {setUser} = userSlice.actions
    const dispatch = useAppDispatch()
    const location = useLocation()
    const isLogin = location.pathname === '/login'
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
    {isLogin? <div className={cl.login__form}>
        <TextField value={email} placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
        <TextField value={password} placeholder="Password..." type="password" onChange={(e) => setPassword(e.target.value)}/>
        <Button onClick={logIn} variant="outlined">
          Login
        </Button>
        <span>Don't have account? <Link to={"/registration"}>Sign up</Link></span>
      </div> : 
      <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validateOnBlur
      onSubmit={(values) => {
        console.log(values);
        const signIn = async () => {
          try {
            const data = await registration(values.email, values.password)
            dispatch(setUser(data as IUser))
            dispatch(setIsAuth(true))
          }
          catch (e: any) {
            alert(e.response.data.message)
          }
        }
        signIn()

      }}
      validationSchema={SignUpSchema}>
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
        <Form onSubmit={handleSubmit} className={cl.signUp__form}>
          <div className={cl.form__userinfo}>

            <div className={cl.form__input}>
              <TextField
                id='outlined-basic'
                label='Email'
                variant='outlined'
                type='email'
                name='email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              {touched.email && errors.email && (
                <p className={cl.form__error}>{errors.email}</p>
              )}
            </div>

            <div className={cl.form__input}>
              <TextField
                id='outlined-basic'
                label='Password'
                variant='outlined'
                type='password'
                name='password'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
              />
              {touched.password && errors.password && (
                <p className={cl.form__error}>{errors.password}</p>
              )}
            </div>
          </div>
          <div className={cl.form__button}>
            <Button type="submit" variant="outlined">Submit</Button>
          </div>
          <span>Don't have account? <Link to={"/login"}>Sign in</Link></span>
        </Form>
      )}
    </Formik>
      }
      
    </div>
  );
};

export default Login;