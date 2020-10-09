import {Dispatch} from 'redux'
import {setAppErrorAC, SetAppErrorActionType, SetAppStatusActionType, setAppStatusAC} from '../../m2-bll/app-reducer'


export const handleServerNetworkError = (error: any, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppErrorAC(error.response ? error.response.data.error : error.message))
    dispatch(setAppStatusAC('failed'))
}
