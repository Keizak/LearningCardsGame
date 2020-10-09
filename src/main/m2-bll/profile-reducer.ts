import {Dispatch} from "redux";
import {SetAppErrorActionType, SetAppStatusActionType} from "./app-reducer";
import {authAPI, profileUpdatePhoto} from "../m3-dal/login-api";
import {authMeTC, setIsLoggedInAC, setUsersDataAC} from "./auth-reducer";
import {handleServerNetworkError} from "../m1-ui/utils/error-utils";


const initialState: InitialStateType = {
    isInitialized: false
}

export const ProfileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

// actions

// thunk

export const changeUserDataTC = (data:profileUpdatePhoto) => (dispatch: ThunkDispatch) => {
    authAPI.profileUpdatePhoto(data)
        .then(res => {
            dispatch(setUsersDataAC(res.data.updatedUser))
        }).catch((error) => {
        handleServerNetworkError(error, dispatch);
    })
}

// types


type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setUsersDataAC>
type InitialStateType = {
    isInitialized: boolean,

}


type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
