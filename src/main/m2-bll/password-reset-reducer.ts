import {Dispatch} from "redux";
import {passwordRecoveryApi} from "../m3-dal/password-recovery-api";

const initialState: InitialStateType = {
    loading: false,
    response: null
}

export const passwordResetReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "LOADING":
            return {...state, loading: action.loading}
        case "SET-PASS-RESET-RESPONSE":
            return {...state, response: action.response}
        default:
            return {...state}
    }
}
export const setLoadingAC = (loading: boolean) => ({type: 'LOADING', loading} as const)
export const setResponseAC = (response: ResponseType) => ({type: 'SET-PASS-RESET-RESPONSE', response} as const)

export const resetPasswordTC = (email: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingAC(true))
    let data = {
        email: email,
        from: "test-front-admin",
        message: `<div style = "background-color: lime; padding: 15px">
            password recovery link:
    <a href='http://localhost:3000/study-cards#/password-generation/$token$'>link</a>
    </div>`
    }
    passwordRecoveryApi.forgot(data).then((res: any) => {
        if (res.status === 200) {
            dispatch(setResponseAC(res.data))
            dispatch(setLoadingAC(false))
            alert(res.data.info)
        }
    }).catch(reason => {
        alert(reason)
        dispatch(setLoadingAC(false))
    })
}


export type setLoadingACType = ReturnType<typeof setLoadingAC>
export type setResponseACType = ReturnType<typeof setResponseAC>
export type InitialStateType = {
    loading: boolean,
    response: null|ResponseType
}
type ActionsType =
    | setLoadingACType
    | setResponseACType


type ResponseType = {
    info: string
    success: boolean
    answer: boolean
    html: boolean
}