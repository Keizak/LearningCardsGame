import axios from "axios"


const instance = axios.create({
    baseURL: "http://localhost:7542/2.0/" ,//'https://neko-back.herokuapp.com/2.0/',
})

// api
export const passwordRecoveryApi = {
    forgot(data:dataType) {
        const promise = instance.post('/auth/forgot',data );
        return promise;
    },
    setNewPassword(newPasswordData:newPasswordDataType) {
        const promise = instance.post('/auth/set-new-password',newPasswordData);
        return promise;
    }
}

export type dataType = {
    email: string
    from: string
    message: any
}
export type newPasswordDataType = {
    password:string
    resetPasswordToken:string
}
