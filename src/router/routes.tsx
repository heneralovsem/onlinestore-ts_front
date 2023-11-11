import { Navigate } from "react-router-dom";
import LoginPage from '../pages/LoginPage'
import ShopPage from '../pages/ShopPage'
import ShopDevicePage from "../pages/ShopDevicePage";
import CheckoutPage from "../pages/CheckoutPage";

export const privateRoutes = [
    {path: '/shop', component: <ShopPage/>},
    {path: '/shop/:id', component: <ShopDevicePage/>},
    {path: '/checkout', component: <CheckoutPage/>},
    {path: '/', component: <Navigate to= "/shop" replace/> },
    {path: '/*', component: <Navigate to= "/shop" replace/> },
    {path: '/login', component: <Navigate to= "/shop" replace/> },
]
export const publicRoutes = [
    {path: '/login', component: <LoginPage/>},
    {path: '/registration', component: <LoginPage/>},
    {path: '/', component: <Navigate to= "/shop" replace/> },
    {path: '/*', component: <Navigate to= "/shop" replace/> },
    {path: '/shop', component: <Navigate to= "/login" replace/> }, 
]