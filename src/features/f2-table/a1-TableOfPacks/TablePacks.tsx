import style from "./css.module.css";
import React, {useState} from "react";
import {PackType} from "../../../main/m2-bll/table-reduser";
import SimpleModal from "../../../main/m1-ui/common/Modal/modal";
import {Button} from "@material-ui/core";
import SimpleUpdatePackInput from "../../../main/m1-ui/common/Modal/modalInput2";
import {Preloader} from "../../../main/m1-ui/common/Preloader/Preloader";

export const buttonStyle = {margin: "5px", width: "20px", height: " 20px"}


type ButtonType = {
    name: string
    onClick?: (data: any, name?: string, rating?: number, grade?: number, deckCover?: string) => any

}
type columnsNamePropsType = {
    Content: Array<any>
}
type RowContentPropsType = {
    Data: Array<PackType> | any
    buttonsData: Array<ButtonType>
    rowsCount: number
    currentPage:number
}
type ButtonsPropsType = {
    buttonsData: Array<ButtonType>
    id: string
}
type TablePropsType = {
    columnsName: Array<any>
    rowContent: Array<PackType> | null
    buttonsData: Array<ButtonType>
    rowsCount: number
    currentPage:number
}

function Buttons(props: ButtonsPropsType) {


    let [deleteOpen, setDeleteOpen] = useState(false)
    let [update, setUpdateOpen] = useState(false)

    return (<div style={{
        display: "flex", width: "fit-content",
        height: "fit-content",alignItems: "center",
        justifyContent:" center"
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
    let TableStyle  = document.getElementById("Table")
    let TableWidth = ""
    let TableHeight = ""
    if (TableStyle) {
        TableWidth = window.getComputedStyle(TableStyle).width
        TableHeight = window.getComputedStyle(TableStyle).height
    }
    return (<div className={style.Content}>
        {props.Content.map((e: any) => {
            return <div style={{
                width: `calc(${TableWidth}/${props.Content.length})`,
                height: `calc(${TableHeight}/25)`
            }}>{e}</div>
        })}
    </div>)
}

function RowContent(props: RowContentPropsType) {
    // let rowData = []
    let date =""
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
    return (<div className={style.rowContent}>
        {props.Data === null ? <Preloader/> :
            props.Data.map((i:PackType ) => {
                if (i.updated.length > 11 ) date = i.updated.substring(0, 10)
                else date = i.updated

                return <ColumnsName
                    Content={[i.name, i.cardsCount, date, i.grade,
                        <Buttons id={i._id} buttonsData={props.buttonsData}/>]}/>
            })}
    </div>)
}


function TableForPacks(props: TablePropsType) {
    return (
        <div className={style.Table} id={"Table"}>
            <div className={style.HeaderTable}>
                <ColumnsName Content={props.columnsName}/>
            </div>
            <div className={style.ContentTable}>
                <RowContent Data={props.rowContent}
                            buttonsData={props.buttonsData}
                            rowsCount={props.rowsCount}
                            currentPage={props.currentPage}
                />
            </div>
        </div>
    )
}


export default TableForPacks;