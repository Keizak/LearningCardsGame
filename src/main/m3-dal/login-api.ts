import axios from 'axios'

const settings = {
    withCredentials: true
}
const instance = axios.create({
    baseURL: "http://localhost:7542/2.0" ,//"https://neko-back.herokuapp.com/2.0",
    ...settings
})

// api
export const authAPI = {
    login(data: LoginParamsType) {
        const promise = instance.post('auth/login', data);
        return promise;
    },
    logout() {
        const promise = instance.delete('auth/me');
        return promise;
    },
    authMe() {
        const promise = instance.post('auth/me',{},{});
        return promise
    },
    profileUpdatePhoto(data:profileUpdatePhoto) {
        return instance.put('auth/me', {name:data.name,avatar:data.avatar});
    }
}

// types
export type LoginParamsType = {
    password: string
    rememberMe: boolean
    email: string;
}
export type profileUpdatePhoto = {
    name:string
    avatar:string|File
}


