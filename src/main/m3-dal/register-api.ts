import axios from "axios"


const settings = {
    withCredentials: true
}
const instance = axios.create({
    baseURL: "http://localhost:7542/2.0",//"https://neko-back.herokuapp.com/2.0",
    ...settings
})

// api


export const registrationApi = {
    setRegister(data:RegistretionDataType) {
        const promise = instance.post('auth/register',data );
        return promise;
    }
}


export type RegistretionDataType = {
    email: string
    password: string
}
