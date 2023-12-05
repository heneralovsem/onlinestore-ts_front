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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { user } = useAppSelector((state) => state.userReducer);
  console.log(user);
  const { setIsAuth } = userSlice.actions;
  const { setUser } = userSlice.actions;
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  // const [loginUser, {}] = userAPI.useLoginUserMutation()
  const logIn = async () => {
    try {
      const data = await login(email, password);
      dispatch(setUser(data as IUser));
      dispatch(setIsAuth(true));
    } catch (e: any) {
      alert(e.response.data.message);
    }
  };
  // };

  return (
    <div className={cl.login__wrapper}>
      {isLogin ? <h2>Login</h2> : <h2>Sign Up</h2>}
      {isLogin ? (
        <div className={cl.login__form}>
          <TextField
            value={email}
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            value={password}
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={cl.login__row}>
            <span className={cl.login__text}>
              Don't have account?{" "}
              <Link className={cl.login__link} to={"/registration"}>
                Sign up
              </Link>
            </span>
            <Button
              className={cl.login__button}
              color="success"
              onClick={logIn}
              variant="outlined"
            >
              Login
            </Button>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validateOnBlur
          onSubmit={(values) => {
            console.log(values);
            const signIn = async () => {
              try {
                const data = await registration(values.email, values.password);
                dispatch(setUser(data as IUser));
                dispatch(setIsAuth(true));
              } catch (e: any) {
                alert(e.response.data.message);
              }
            };
            signIn();
          }}
          validationSchema={SignUpSchema}
        >
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
            <Form onSubmit={handleSubmit} className={cl.login__form}>
              <div className={cl.form__input}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  name="email"
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
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <p className={cl.form__error}>{errors.password}</p>
                )}
              </div>
              <div className={cl.login__row}>
              <span className={cl.login__text}>
                Don't have account?{" "}
                <Link className={cl.login__link} to={"/login"}>
                  Sign in
                </Link>
              </span>
                <Button className={cl.login__button} type="submit" color="success" variant="outlined">
                  Sign Up
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Login;
