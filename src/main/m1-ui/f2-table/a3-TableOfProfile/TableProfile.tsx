import style from "./css.module.css";
import React, {useState} from "react";
import {PackType} from "../../../m2-bll/table-reduser";
import {Preloader} from "../../common/Preloader/Preloader";

export const buttonStyle = {margin: "5px", width: "20px", height: " 20px"}


type ButtonType = {
    name: string
    onClick?: (data: any, name?: string, rating?: number, grade?: number, deckCover?: string) => any

}
type columnsNamePropsType = {
    Content: Array<any>
    TableWidth: string
    TableHeight: string
}
type RowContentPropsType = {
    Data: Array<PackType> | null
    buttonsData: Array<ButtonType>
    TableWidth: string
    TableHeight: string
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

    return (<div className={style.Content}>
        {props.Content.map((e: string) => {
            return <div style={{
                width: `calc(${props.TableWidth}/${props.Content.length})`,
                height: `calc(${props.TableHeight}/10)`
            }}>{e.length > 11 ? e.substring(0, 10) : e}</div>
        })}
    </div>)
}

function RowContent(props: RowContentPropsType) {
    return (<div className={style.rowContent}>
        {props.Data === null ? <Preloader/> :
            props.Data.map((i) => {
                return <ColumnsName
                    TableWidth={props.TableWidth} TableHeight={props.TableHeight}
                    Content={[i.name, i.cardsCount, i.grade]}/>
            })}
    </div>)
}


function TableForProfile(props: TablePropsType) {
    let TableStyle = document.getElementById("Table")
    let TableWidth = ""
    let TableHeight = ""
    if (TableStyle) {
        TableWidth = window.getComputedStyle(TableStyle).width
        TableHeight = window.getComputedStyle(TableStyle).height
    }
    return (<div className={style.box}>
            <div className={style.Table} id={"Table"}>
                {TableStyle ? <>
                        <div className={style.HeaderTable}>
                            <ColumnsName Content={props.columnsName} TableWidth={TableWidth} TableHeight={TableHeight}/>
                        </div>
                        <div className={style.ContentTable}>
                            <RowContent Data={props.rowContent} buttonsData={props.buttonsData} TableWidth={TableWidth}
                                        TableHeight={TableHeight}/>
                        </div>
                    </>
                    : <div className={style.Preloader}><Preloader/></div>}
            </div>
        </div>
    )
}


export default TableForProfile;