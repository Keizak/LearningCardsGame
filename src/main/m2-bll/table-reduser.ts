import {Dispatch} from "redux";
import {
    AddCardDataType,
    AddPackDataType, DeleteCardDataType,
    GetCardsDataType, GetPacksDataType, GradeCardDataType,
    TableApi,
    UpdateCardDataType,
    UpdatePackDataType
} from "../m3-dal/tableApi";
import {SetAppErrorActionType, SetAppStatusActionType} from "./app-reducer";
import {handleServerNetworkError} from "../m1-ui/utils/error-utils";

export type PaginatorType = {
    packsCount: number
    startPage: number
    endPage: number
    currentPage: number
}
type StateType = {
    cards: any
    allPacks: any
    myPacks: any
    isLoading: boolean
    paginator: PaginatorType
}

const initialState: StateType = {
    allPacks: null,
    myPacks: null,
    cards: null,
    isLoading: false,
    paginator: {
        currentPage: 1,
        packsCount: 1,
        startPage: 1,
        endPage: 5,
    }

}

export const tableReducer = (state = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case 'SET-ALL-PACKS':
            return {...state, allPacks: action.packs}
        case 'SET-MY-PACKS':
            return {...state, myPacks: action.packs}
        case 'SET-IS-LOADING':
            return {...state, isLoading: action.value}
        case 'SET-CARDS':
            return {...state, cards: action.cards}
        case 'SET-COUNT': {
            let CopyState = {...state, ...state.paginator}
            CopyState.paginator.packsCount = action.count
            return {...state, paginator: {...state.paginator, packsCount: action.count}}
        }
        case 'SET-START-VALUE-PR': {
            let CopyState = {...state, ...state.paginator}
            CopyState.paginator.startPage = action.value
            return CopyState
        }
        case 'SET-END-VALUE-PR': {
            let CopyState = {...state, ...state.paginator}
            CopyState.paginator.endPage = action.value
            return CopyState
        }
        case 'SET-CURRENT-PAGE': {
            return {...state, paginator: {...state.paginator, currentPage: action.value}}
        }
        case 'FILTER-FOR SEARCH': {
            debugger
            let searchValue = new RegExp(action.matchValue, 'i');
            let filterPacks = action.data.filter((pack) => pack.name.match(searchValue))
            return {...state, allPacks: filterPacks, paginator: {...state.paginator, packsCount: filterPacks.length}}
        }
        default:
            return {...state}
    }
}


// thunks

type ThunkDispatch = Dispatch<ActionType | SetAppStatusActionType | SetAppErrorActionType>

export const getPacksTC = (data:GetPacksDataType) => (dispatch: ThunkDispatch) => {
    setIsLoadingAC(true)
    TableApi.getPacks(data).then(res => {
        dispatch(setAllPacksAC(res.data.cardPacks))
        dispatch(setPacksTotalCountAC(res.data.cardPacksTotalCount))
        dispatch(setIsLoadingAC(false))
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}
export const addPackTC = (data: AddPackDataType, getData: GetPacksDataType) => (dispatch: ThunkDispatch) => {
    setIsLoadingAC(true)
    TableApi.addPack(data).then(res => {
        TableApi.getPacks(getData).then(res => {
            dispatch(setAllPacksAC(res.data.cardPacks))
            dispatch(setIsLoadingAC(false))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}
export const deletePackTC = (data: string, getData: GetPacksDataType) => (dispatch: ThunkDispatch) => {
    setIsLoadingAC(true)
    TableApi.deletePack(data).then(res => {
        TableApi.getPacks(getData).then(res => {
            dispatch(setAllPacksAC(res.data.cardPacks))
            dispatch(setIsLoadingAC(false))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}
export const updatePackTC = (data: UpdatePackDataType, getData: GetPacksDataType) => (dispatch: ThunkDispatch) => {
    setIsLoadingAC(true)
    TableApi.updatePack(data).then(res => {
        debugger
        TableApi.getPacks(getData).then(res => {
            debugger
            dispatch(setAllPacksAC(res.data.cardPacks))
            dispatch(setIsLoadingAC(false))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}


export const getCardsTC = (data: GetCardsDataType) => (dispatch: ThunkDispatch) => {
    setIsLoadingAC(true)
    TableApi.getCards(data)
        .then(res => {
            dispatch(setCardsAC(res.data.cards))
            dispatch(setIsLoadingAC(false))
        }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}
export const deleteCardTC = (data: DeleteCardDataType) => (dispatch: ThunkDispatch) => {
    debugger
    setIsLoadingAC(true)
    TableApi.deleteСard(data.cardId).then(res => {
        TableApi.getCards({cardsPack_id: data.packId}).then(res => {
            dispatch(setIsLoadingAC(false))
            dispatch(setCardsAC(res.data.cards))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    })
}
export const updateCardTC = (data: UpdateCardDataType) => (dispatch: ThunkDispatch) => {
    setIsLoadingAC(true)
    TableApi.updateСard(data).then(res => {
        TableApi.getCards({cardsPack_id: data.packId}).then(res => {
            dispatch(setIsLoadingAC(false))
            dispatch(setCardsAC(res.data.cards))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    })
}
export const addCardTC = (data: AddCardDataType) => (dispatch: ThunkDispatch) => {
    setIsLoadingAC(true)
    TableApi.addCard(data).then(res => {
        TableApi.getCards({cardsPack_id: data.card.cardsPack_id}).then(res => {
            dispatch(setIsLoadingAC(false))
            dispatch(setCardsAC(res.data.cards))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    })
}

export const gradeCardTC = (data: GradeCardDataType) => (dispatch: ThunkDispatch) => {
    setIsLoadingAC(true)
    TableApi.gradeСard(data).then(res => {
        TableApi.getCards({cardsPack_id: res.data.updatedGrade.cardsPack_id}).then(res => {
            dispatch(setIsLoadingAC(false))
            dispatch(setCardsAC(res.data.cards))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    })
}


// Action Creators

export const setAllPacksAC = (packs: PackType) => ({type: 'SET-ALL-PACKS', packs} as const)
export const setMyPacksAC = (packs: PackType) => ({type: 'SET-MY-PACKS', packs} as const)
export const setIsLoadingAC = (value: boolean) => ({type: 'SET-IS-LOADING', value} as const)
export const setCardsAC = (cards: CardsType) => ({type: 'SET-CARDS', cards} as const)
export const setPacksTotalCountAC = (count: number) => ({type: 'SET-COUNT', count} as const)
export const setStartPagePaginatorAC = (value: number) => ({type: 'SET-START-VALUE-PR', value} as const)
export const setEndPagePaginatorAC = (value: number) => ({type: 'SET-END-VALUE-PR', value} as const)
export const setCurrentPagerAC = (value: number) => ({type: 'SET-CURRENT-PAGE', value} as const)
export const filterForSearchAC = (data: Array<any>,matchValue:string) => ({type: 'FILTER-FOR SEARCH', data,matchValue} as const)

type filterForSearchActionType = ReturnType<typeof filterForSearchAC>
type setCardsActionType = ReturnType<typeof setCardsAC>
type setAllPacksActionType = ReturnType<typeof setAllPacksAC>
type setMyPacksActionType = ReturnType<typeof setMyPacksAC>
type setLoadingActionType = ReturnType<typeof setIsLoadingAC>
type setPacksTotalCountActionType = ReturnType<typeof setPacksTotalCountAC>
export type setStartPagePaginatorActionType = ReturnType<typeof setStartPagePaginatorAC>
type setEndPagePaginatorActionType = ReturnType<typeof setEndPagePaginatorAC>
type setCurrentPagerActionType = ReturnType<typeof setCurrentPagerAC>

type ActionType = setLoadingActionType | setAllPacksActionType | setCardsActionType | setPacksTotalCountActionType |
    setStartPagePaginatorActionType | setEndPagePaginatorActionType | setCurrentPagerActionType | setMyPacksActionType |
    filterForSearchActionType


export type PackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
    deckCover: any
}
export type CardsType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
}
export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    created: string
    updated: string
    __v: number
    _id: string
    number?: number
}
