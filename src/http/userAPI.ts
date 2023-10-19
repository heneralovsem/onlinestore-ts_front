import { $authHost, $host } from "."
import { IUser } from "../types/types"
import jwt_decode from "jwt-decode"

//@ts-ignore
export const registration =  async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token) 
}
//@ts-ignore
export const login =  async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const check =  async () => {
    const {data} = await $authHost.get('api/user/auth')
    console.log(data)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}