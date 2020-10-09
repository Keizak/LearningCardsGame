import {handleServerNetworkError} from "../m1-ui/utils/error-utils";
import {Dispatch} from "redux";
import {setAppErrorAC, SetAppErrorActionType, SetAppStatusActionType} from "./app-reducer";
import {registrationApi, RegistretionDataType} from "../m3-dal/register-api";


const initialState: InitialStateType = {
    isRegistered: false,
    isLoading:false,
}

export const registrationReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {

        case 'SET-IS-REGISTATED':
            return {...state, isRegistered: action.value}
        case 'SET-IS-LOADING':
            return {...state, isLoading: action.value}

        default:
            return {...state}
    }
}


// thunks
export const registrationTC = (data: RegistretionDataType) => (dispatch: ThunkDispatch) => {
    registrationApi.setRegister(data)
        .then(res => {
            dispatch(setIsRegistratedAC(true))
            dispatch(setIsLoadingAC(false))
        }).catch((error) => {
        dispatch(setIsLoadingAC(false))
        handleServerNetworkError(error, dispatch);
        setTimeout(() => dispatch(setAppErrorAC(null)), 3000);

    })
}


// Action Creators
export const setIsRegistratedAC = (value: boolean): setIsRegistratedActionType =>
    ({type: 'SET-IS-REGISTRATED', value} as const)
export const setIsLoadingAC = (value: boolean): setIsLoadingActionType =>
    ({type: 'SET-IS-LOADING', value} as const)


// Types

export type InitialStateType = any

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>


type ActionsType = setIsRegistratedActionType | setIsLoadingActionType

export type setIsRegistratedActionType = {
    type: string
    value: boolean
}
export type setIsLoadingActionType = {
    type: string
    value: boolean
}

