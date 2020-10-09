import style from "./css.module.css";
import React, {useState} from "react";
import {PackType} from "../../../main/m2-bll/table-reduser";
import {Preloader} from "../../../main/m1-ui/common/Preloader/Preloader";

export  const buttonStyle = {margin:"5px", width: "20px",height:" 20px"}


type ButtonType = {
    name: string
    onClick?: (data: any, name?:string, rating?:number, grade?:number, deckCover?:string) => any

}
type columnsNamePropsType = {
    Content: Array<any>
}
type RowContentPropsType = {
    Data: Array<PackType> | null
    buttonsData: Array<ButtonType>
}
type ButtonsPropsType = {
    buttonsData: Array<ButtonType>
    id: string
}
type TablePropsType = {
    columnsName: Array<any>
    rowContent: Array<PackType> | null
    buttonsData: Array<ButtonType>
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
        {props.Content.map((e: string ) => {
            return <div style={{
                width: `calc(${TableWidth}/${props.Content.length})`,
                height: `calc(${TableHeight}/10)`
            }}>{ e.length > 11 ? e.substring(0,10) : e}</div>
        })}
    </div>)
}

function RowContent(props: RowContentPropsType) {
    return (<div className={style.rowContent}>
        {props.Data === null ? <Preloader/> :
            props.Data.map((i) => {
                return <ColumnsName
                    Content={[i.name, i.cardsCount, i.grade]}/>
            })}
    </div>)
}


function TableForProfile(props: TablePropsType) {
    return (
        <div className={style.Table} id={"Table"}>
            <div className={style.HeaderTable}>
                <ColumnsName Content={props.columnsName} />
            </div>
            <div className={style.ContentTable}>
                <RowContent Data={props.rowContent} buttonsData={props.buttonsData} />
            </div>
        </div>
    )
}


export default TableForProfile;