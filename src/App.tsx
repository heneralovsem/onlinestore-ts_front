import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import { Context } from '.';
import { check } from './http/userAPI';
import { userSlice } from './store/reducers/UserSlice';
import { useAppDispatch } from './hooks/redux';
import { IUser } from './types/types';
import MainLoader from './components/MainLoader/MainLoader';
// import { userAPI } from './services/UserService';

function App() {
  const {setIsAuth} = userSlice.actions
  const {setUser} = userSlice.actions
  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  // const {data: user} = userAPI.useCheckUserQuery('')
  // console.log(user)
  useEffect(()  => {
      const checkAuth = async () => {
        try {
        const data = await check()
        dispatch(setIsAuth(true))
        dispatch(setUser(data as IUser))
        }
        catch (e: any) {
          
        }
        finally {
        setLoading(false)
        }
    }
    checkAuth()
  }, [])
  if (loading) {
    return <MainLoader/>
  }


  return (
    <BrowserRouter>
        <Navbar/>
        <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
