import React, {useEffect, useState} from "react";
import style from "./css.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {useHistory} from "react-router-dom";
import {
    addPackTC,
    deletePackTC,
    getPacksTC,
    PackType,
    PaginatorType,
    setCurrentPagerAC, setEndPagePaginatorAC, setStartPagePaginatorAC,
    updatePackTC
} from "../../../m2-bll/table-reduser";
import {ErrorSnackbar} from "../../common/ErrorSnackbar/ErrorSnackbar";

import Paginator from "../../common/Paginator/Paginator";
import SimpleModalInput from "../../common/Modal/modalInput";
import {Button} from "@material-ui/core";
import {Preloader} from "../../common/Preloader/Preloader";
import {userDate} from "../../../m2-bll/auth-reducer";
import {RangeSlider} from "../a4-SearchPanel/DoubleRangeSearch/DoubleRangeSearch";
import {TableForPacks} from "./TableOfPacks";


function PackPage() {
    const history = useHistory()
    const dispatch = useDispatch();

    const isLoading = useSelector<AppRootStateType, boolean>(state => state.table.isLoading)
    const PacksData = useSelector<AppRootStateType, Array<PackType> | null>(state => state.table.allPacks);
    const paginatorData = useSelector<AppRootStateType, PaginatorType>(state => state.table.paginator);
    const {_id} = useSelector<AppRootStateType, userDate>(state => state.auth.UserData);

    const [valueRange, setValueRange] = useState<any>({min: 0, max: 20})
    const [valueSearch, setValueSearch] = useState<string>("")
    let [addOpen, setAddModalOpen] = useState(false)


    let maxPages = Math.ceil(paginatorData.packsCount / 22)


    let packsCount: number = 0
    if (window.matchMedia("(min-width: 1200px)").matches) packsCount = 22
    else packsCount = 10


    useEffect(() => {
        if (window.matchMedia("(min-width: 1200px)").matches) {
            dispatch(getPacksTC({pageCount: packsCount, page: 1}))
        } else {
            dispatch(getPacksTC({pageCount: packsCount, page: 1}))
        }

    }, [])
    const playButton = (id: string) => {
        history.push(`/play/${id}`)
    }
    const addButton = (name: string) => {
        dispatch(addPackTC({cardsPack: {name: name}}, {page: paginatorData.currentPage}))
    }
    const deleteButton = (id: string) => {
        dispatch(deletePackTC(id, {page: paginatorData.currentPage}))
    }
    const updateButton = (id: string, name?: string, rating: number = 0, grade: number = 0, deckCover: string = "") => {
        dispatch(updatePackTC({cardsPack: {_id: id, name: name, rating: rating}}, {page: paginatorData.currentPage}))
    }
    const cardsButton = (id: string) => {
        history.push(`/Cards/${id}`)
    }
    const goStart = () => {
        if (valueSearch.length >= 1) dispatch(getPacksTC({pageCount: 22, page: 1, packName: valueSearch}))
        else dispatch(getPacksTC({pageCount: 22, page: 1}))
        dispatch(setCurrentPagerAC(1))
        dispatch(setStartPagePaginatorAC(1))
        dispatch(setEndPagePaginatorAC(maxPages))
    }
    const goFinish = () => {
        if (valueSearch.length >= 1) dispatch(getPacksTC({pageCount: 22, page: maxPages, packName: valueSearch}))
        else dispatch(getPacksTC({pageCount: 22, page: maxPages}))
        dispatch(setCurrentPagerAC(maxPages))
        if (maxPages < 5) return
        dispatch(getPacksTC({pageCount: 22, page: maxPages}))
        dispatch(setStartPagePaginatorAC(maxPages - 4))
        dispatch(setEndPagePaginatorAC(maxPages))
    }
    const searchChangeValue = (e: any) => {
        setValueSearch(e.currentTarget.value)
    }
    const goSearchName = (e: any) => {
        dispatch(getPacksTC({pageCount: 22, page: 1, packName: valueSearch, max: valueRange.max, min: valueRange.min}))
    }
    const goSearchCards = (value: any) => {
        setValueRange(value)
    }
    const goPage = (value: number) => {
        if (value === paginatorData.endPage) {
            if (value === maxPages) {
                dispatch(setCurrentPagerAC(value))
                if (valueSearch.length >= 1) dispatch(getPacksTC({pageCount: 22, page: value, packName: valueSearch}))
                dispatch(getPacksTC({pageCount: 22, page: value}))
                return
            }
            dispatch(setStartPagePaginatorAC(value))
            dispatch(setEndPagePaginatorAC(value + 4))
            dispatch(setCurrentPagerAC(value))
            if (valueSearch.length >= 1) dispatch(getPacksTC({pageCount: 22, page: value, packName: valueSearch}))
            else dispatch(getPacksTC({pageCount: 22, page: value}))
            return
        } else if (value === paginatorData.startPage) {
            if (value === 1) {
                dispatch(setCurrentPagerAC(value))
                if (valueSearch.length >= 1) dispatch(getPacksTC({pageCount: 22, page: value, packName: valueSearch}))
                else dispatch(getPacksTC({pageCount: 22, page: value}))
                return
            }
            dispatch(setStartPagePaginatorAC(value - 4))
            dispatch(setEndPagePaginatorAC(value))
            dispatch(setCurrentPagerAC(value))
            if (valueSearch.length >= 1) dispatch(getPacksTC({pageCount: 22, page: value, packName: valueSearch}))
            else dispatch(getPacksTC({pageCount: 22, page: value}))

            return
        }
        dispatch(setCurrentPagerAC(value))
        if (valueSearch.length >= 1) dispatch(getPacksTC({pageCount: 22, page: value, packName: valueSearch}))
        else dispatch(getPacksTC({pageCount: 22, page: value}))
    }
    const getAllPacks = () => {
        dispatch(getPacksTC({pageCount: 22, page: 1}))
        setValueSearch("")
    }
    const getMyPacks = (e: any) => {
        if (e.currentTarget.checked) dispatch(getPacksTC({pageCount: 22, user_id: _id}))
        else dispatch(getPacksTC({pageCount: 22}))

    }
    return (<div className={style.Main}>
            {!PacksData && isLoading ? <Preloader/> :
                <>
                    <SimpleModalInput text={"Do you want to create new pack?"}
                                      open={addOpen}
                                      onButtonClick={addButton}
                                      setModalOpen={setAddModalOpen}/>
                    <div className={style.SearchPanel}>
                        <div className={style.desktopPanel}>
                            <button onClick={getAllPacks} className={style.refresh}/>
                            <div><input type="checkbox" onChange={getMyPacks}/><br/>My Packs</div>
                            <div><input value={valueSearch} onChange={searchChangeValue} placeholder={"\n" +
                            "Enter a value to search"}/></div>
                            <div className={style.slider}><RangeSlider value={valueRange} setValue={goSearchCards}/>
                            </div>
                            <button onClick={goSearchName}>Search</button>
                        </div>
                        <div className={style.mobilePanel}>
                            <div className={style.firstBlock}>
                                <div><input value={valueSearch} onChange={searchChangeValue} placeholder={"\n" +
                                "Enter a value to search"}/></div>
                                <div className={style.slider}><RangeSlider value={valueRange} setValue={goSearchCards}/>
                                </div>
                                <button onClick={goSearchName}>Search</button>
                            </div>
                            <div className={style.secondBlock}>
                                <button onClick={getAllPacks} className={style.refresh}/>
                                Refresh
                                <div><input type="checkbox" onChange={getMyPacks}/>My Packs</div>
                            </div>
                        </div>


                    </div>
                    <TableForPacks
                        titleContent={["Name", "Cards", "Last update", "Grade", <Button size={"small"}
                                                                                        style={{
                                                                                            margin: "5px",
                                                                                            height: " 20px"
                                                                                        }}
                                                                                        variant="contained"
                                                                                        color="primary"
                                                                                        onClick={() => setAddModalOpen(true)}>New</Button>]}
                        rowsContent={PacksData}
                        buttonsData={[
                            {name: "Update", onClick: updateButton},
                            {name: "Delete", onClick: deleteButton},
                            {name: "Cards", onClick: cardsButton},
                            {name: "Play", onClick: playButton},]}/>

                    {/*<TableForPacks*/}
                    {/*    columnsName={["Name", "Cards", "Last update", "Grade",*/}
                    {/*        <Button size={"small"}*/}
                    {/*                style={{margin: "5px", height: " 20px"}}*/}
                    {/*                variant="contained"*/}
                    {/*                color="primary"*/}
                    {/*                onClick={() => setAddModalOpen(true)}>New</Button>]}*/}
                    {/*    rowContent={PacksData}*/}
                    {/*    buttonsData={[*/}
                    {/*        {name: "Update", onClick: updateButton},*/}
                    {/*        {name: "Delete", onClick: deleteButton},*/}
                    {/*        {name: "Cards", onClick: cardsButton},*/}
                    {/*        {name: "Play", onClick: playButton},]}*/}
                    {/*    currentPage={paginatorData.currentPage}*/}
                    {/*    packsCount={packsCount}*/}
                    {/*/>*/}
                    <Paginator maxPages={maxPages}
                               endValue={paginatorData.endPage}
                               startValue={paginatorData.startPage}
                               goFinish={goFinish}
                               goPage={goPage}
                               goStart={goStart}/>
                </>
            }

            <ErrorSnackbar/>
        </div>

    )
}


export default PackPage;