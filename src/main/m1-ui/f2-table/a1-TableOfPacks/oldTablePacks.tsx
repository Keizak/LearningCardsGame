import style from "./css.module.css";
import React, {useEffect, useState} from "react";
import {PackType} from "../../../m2-bll/table-reduser";
import SimpleModal from "../../common/Modal/modal";
import {Button} from "@material-ui/core";
import SimpleUpdatePackInput from "../../common/Modal/modalInput2";
import {Preloader} from "../../common/Preloader/Preloader";

export const buttonStyle = {
    marginRight: "5px",
    width: "2vh",
    height: "2vh"
}


type ButtonType = {
    name: string
    onClick?: (data: any, name?: string, rating?: number, grade?: number, deckCover?: string) => any
}
type columnsNamePropsType = {
    Content: Array<any>
    TableWidth: string
    TableHeight: string
    packsCount: number
}
type RowContentPropsType = {
    Data: Array<PackType> | any
    buttonsData: Array<ButtonType>
    currentPage: number
    TableWidth: string
    TableHeight: string
    packsCount: number
}
type ButtonsPropsType = {
    buttonsData: Array<ButtonType>
    id: string
}
type TablePropsType = {
    columnsName: Array<any>
    rowContent: Array<PackType> | null
    buttonsData: Array<ButtonType>
    currentPage: number
    packsCount: number
}

function Buttons(props: ButtonsPropsType) {


    let [deleteOpen, setDeleteOpen] = useState(false)
    let [update, setUpdateOpen] = useState(false)

    return (<div style={{
        display: "flex",
        height: "fit-content", alignItems: "center",
    }}>
        {props.buttonsData.map((i) => {
            const onUpdateButtonClick = (name: string, rating: number, grade: number, deckCover: string) => {
                if (i.onClick) {
                    i.onClick(props.id, name, rating, grade, deckCover)
                }
            }
            let onclick = i.onClick

            function Handler() {
                if (onclick) onclick(props.id)
            }

            switch (i.name) {
                case "Delete":
                    return (deleteOpen ?
                            <SimpleModal text={"Do you want to delete pack?"}
                                         open={deleteOpen}
                                         onButtonClick={Handler}
                                         setModalOpen={setDeleteOpen}/>
                            : <Button size={"small"}
                                      style={buttonStyle}
                                      variant="contained" color="primary"
                                      onClick={() => setDeleteOpen(true)}>{i.name}</Button>
                    )
                case "Update":
                    return (update ?
                            <SimpleUpdatePackInput text={"Do you want to update pack?"} open={update}
                                                   onButtonClick={onUpdateButtonClick}
                                                   setModalOpen={setUpdateOpen}/>
                            : <Button size={"small"}
                                      style={buttonStyle}
                                      variant="contained" color="primary"
                                      onClick={() => setUpdateOpen(true)}>{i.name}</Button>
                    )
                case "Cards":
                    return (<Button size={"small"}
                                    style={buttonStyle}
                                    variant="contained" color="primary"
                                    onClick={Handler}>{i.name}</Button>)
                case "Play":
                    return (<Button size={"small"}
                                    style={buttonStyle}
                                    variant="contained" color="primary"
                                    onClick={Handler}>{i.name}</Button>)
            }
        })}
    </div>)
}

function ColumnsName(props: columnsNamePropsType) {
    return (<div className={style.Content}>
        {props.Content.map((e: any) => {
            return <div style={{
                width: `calc(${props.TableWidth}/${props.Content.length})`,
                height: `calc(${props.TableHeight}/${props.packsCount})`,
                textAlign: 'center',
            }}>{e}</div>
        })}
    </div>)
}

function RowContent(props: RowContentPropsType) {
    // let rowData = []
    // let MaxValue = props.rowsCount
    // if(props.Data){
    //     let countRenderItem = (props.Data.length - (( props.rowsCount*props.currentPage)-props.rowsCount))
    //     if (countRenderItem < props.rowsCount) MaxValue = countRenderItem
    // }
    // let startValue =( MaxValue * props.currentPage ) - MaxValue
    // let endValue = MaxValue * props.currentPage
    // for (let i = startValue; i < endValue; i++) {
    //     if (props.Data) rowData.push(props.Data[i])
    // }
    let date = ""
    return (<div className={style.rowContent}>
        {props.Data === null ? <Preloader/> :
            props.Data.map((i: PackType) => {
                if (i.updated.length > 11) date = i.updated.substring(0, 10)
                else date = i.updated
                return <ColumnsName
                    TableHeight={props.TableHeight} TableWidth={props.TableWidth}
                    packsCount={props.packsCount}
                    Content={[i.name, i.cardsCount, date, i.grade,
                        <Buttons id={i._id} buttonsData={props.buttonsData}/>]}/>
            })}
    </div>)
}


function oldTableForPacks(props: TablePropsType) {
    let TableWidth = ""
    let TableHeight = ""
    if (window.matchMedia("(min-width: 1200px)").matches) {
        TableWidth = "90vw"
        TableHeight = "70vh"
    } else {
        TableWidth = "100%"
        TableHeight = "55vh"
    }
    return (
        <div className={style.Table}>
            <div className={style.HeaderTable}>
                <ColumnsName Content={props.columnsName}
                             TableHeight={TableHeight}
                             TableWidth={TableWidth}
                             packsCount={props.packsCount}/>
            </div>
            <div className={style.ContentTable}>
                <RowContent Data={props.rowContent}
                            buttonsData={props.buttonsData}
                            currentPage={props.currentPage}
                            TableHeight={TableHeight}
                            TableWidth={TableWidth}
                            packsCount={props.packsCount}
                />
            </div>
        </div>
    )
}


export default oldTableForPacks
