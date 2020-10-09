import {Dispatch} from "redux";
import {passwordRecoveryApi, newPasswordDataType} from "../m3-dal/password-recovery-api";
import {setLoadingAC, setLoadingACType} from "./password-reset-reducer";


const initialState:InitialStateType =
    {
        loading: false,
        response: null
    }
export const passwordGenerationReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "LOADING":
            return {...state, loading: action.loading}
        case "SET-PASS-GENERATION-RESPONSE":
            return {...state, response: action.response}
        default:
            return {...state}
    }
}

export const setPassGenerationResponseAC = (response: { info: string }) => ({
    type: "SET-PASS-GENERATION-RESPONSE",
    response
} as const)


export const setNewPasswordTC = (newPasswordData: newPasswordDataType, history:any) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingAC(true))
    passwordRecoveryApi.setNewPassword(newPasswordData).then((res: any) => {
        if (res.status === 200) {
            dispatch(setPassGenerationResponseAC(res.data))
            dispatch(setLoadingAC(false))
            alert(res.data.info)
            history.push('/login/')
        }
    }).catch(reason => {
        alert(reason)
        dispatch(setLoadingAC(false))
    })
}

export type setPassGenerationResponseACType = ReturnType<typeof setPassGenerationResponseAC>
export type InitialStateType =    {
    loading: boolean
    response: { info: string } | null
}
type ActionsType =
    | setLoadingACType
    | setPassGenerationResponseACType