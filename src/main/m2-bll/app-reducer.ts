const initialState: InitialStateType = {
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
}

export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'

export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppStatusAC = (status:  RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setAppInitializedAC = (isInitialized:  boolean) => ({ type: 'APP/SET-INITIALIZED', isInitialized } as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppInitializedActionType


export type InitialStateType = any

