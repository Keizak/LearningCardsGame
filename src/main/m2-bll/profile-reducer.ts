import {Dispatch} from "redux";
import {SetAppErrorActionType, SetAppStatusActionType} from "./app-reducer";
import {authAPI, profileUpdatePhoto} from "../m3-dal/login-api";
import {authMeTC, setIsLoggedInAC, setUsersDataAC} from "./auth-reducer";
import {handleServerNetworkError} from "../m1-ui/utils/error-utils";
import {GetPacksDataType, TableApi} from "../m3-dal/tableApi";
import {PackType, setAllPacksAC, setIsLoadingAC, setPacksTotalCountAC} from "./table-reduser";

type StateType = {
    isInitialized: boolean,
    myPacks: any
}

const initialState: StateType = {
    isInitialized: false,
    myPacks: null
}

export const ProfileReducer = (state = initialState, action: ActionsType):StateType  => {
    switch (action.type) {
        case 'SET-MY-PACKS':
            return {...state, myPacks: action.packs}
        default:
            return state
    }
}

// actions
export const setMyPacksAC = (packs: PackType) => ({type: 'SET-MY-PACKS', packs} as const)
// thunk
export const getMyPacksTC = (data:GetPacksDataType) => (dispatch: ThunkDispatch) => {
    setIsLoadingAC(true)
    TableApi.getPacks(data).then(res => {
        dispatch(setMyPacksAC(res.data.cardPacks))
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}
export const changeUserDataTC = (data:profileUpdatePhoto) => (dispatch: ThunkDispatch) => {
    authAPI.profileUpdatePhoto(data)
        .then(res => {
            dispatch(setUsersDataAC(res.data.updatedUser))
        }).catch((error) => {
        handleServerNetworkError(error, dispatch);
    })
}

// types

type setMyPacksActionType = ReturnType<typeof setMyPacksAC>


type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setUsersDataAC>
    | setMyPacksActionType



type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
