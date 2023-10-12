import React, {useContext, useState} from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../router/routes";
import { Context } from "..";
import { useAppSelector } from "../hooks/redux";


const AppRouter = () => {
    
    const {isAuth} = useAppSelector(state => state.userReducer)

    return (
        <div>
           
    {isAuth ?  <Routes>
    {privateRoutes.map(route => <Route path={route.path} element={route.component} key={route.path}/>)}
    </Routes> : <Routes>
    {publicRoutes.map(route => <Route path={route.path} element={route.component} key={route.path}/>)}
    </Routes>}
        </div>
    )
}
export default AppRouter;