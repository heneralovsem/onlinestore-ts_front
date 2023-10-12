import { Navigate } from "react-router-dom";
import LoginPage from '../pages/LoginPage'
import ShopPage from '../pages/ShopPage'
import ShopDevicePage from "../pages/ShopDevicePage";

export const privateRoutes = [
    {path: '/shop', component: <ShopPage/>},
    {path: '/shop/:id', component: <ShopDevicePage/>},
    {path: '/', component: <Navigate to= "/shop" replace/> },
    {path: '/*', component: <Navigate to= "/shop" replace/> },
    {path: '/login', component: <Navigate to= "/shop" replace/> },
]
export const publicRoutes = [
    {path: '/login', component: <LoginPage/>},
    {path: '/shop/:id', component: <ShopDevicePage/>},
    {path: '/', component: <Navigate to= "/shop" replace/> },
    {path: '/*', component: <Navigate to= "/shop" replace/> },
    {path: '/shop', component: <Navigate to= "/login" replace/> }, 
]