import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'
import brandReducer from './reducers/BrandSlice'
import typeReducer from './reducers/TypeSlice'
import { typesAPI } from "../services/TypesService";
import { userAPI } from "../services/UserService";
import { brandsAPI } from "../services/BrandsService";
import { deviceAPI } from "../services/DeviceService";
import { basketAPI } from "../services/BasketService";
import { reviewAPI } from "../services/ReviewService";
import { orderAPI } from "../services/OrderService";

const rootReducer = combineReducers({
    userReducer,
    brandReducer,
    typeReducer,
    [typesAPI.reducerPath]: typesAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [brandsAPI.reducerPath]: brandsAPI.reducer,
    [deviceAPI.reducerPath]: deviceAPI.reducer,
    [basketAPI.reducerPath]: basketAPI.reducer,
    [reviewAPI.reducerPath]: reviewAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer
    
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware()
            .concat(typesAPI.middleware, userAPI.middleware,brandsAPI.middleware, deviceAPI.middleware, basketAPI.middleware, reviewAPI.middleware, orderAPI.middleware)
    })
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']