import { createAsyncThunk } from "@reduxjs/toolkit";
import { registration, login, check } from "../../http/userAPI";
import { $host, $authHost } from "../../http";
import jwt_decode from "jwt-decode";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user) => {
        const {data} = await $host.post('api/user/login', user)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
    }
)
export const registrateUser = createAsyncThunk(
    'user/registrateUser',
    async (user) => {
        const {data} = await $host.post('api/user/registrate', user)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
    }
)