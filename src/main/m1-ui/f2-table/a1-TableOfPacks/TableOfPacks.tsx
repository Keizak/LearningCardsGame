import React, {useState} from "react";
import {PackType} from "../../../m2-bll/table-reduser";
import {Preloader} from "../../common/Preloader/Preloader";
import style from "./Table.module.css";
import SimpleModal from "../../common/Modal/modal";
import {Button} from "@material-ui/core";
import SimpleUpdatePackInput from "../../common/Modal/modalInput2";
import {buttonStyle} from "./oldTablePacks";




type ButtonsPropsType = {
    buttonsData: Array<ButtonType>
    id: string
}
type ButtonType = {
    name: string
    onClick?: (data: any, name?: string, rating?: number, grade?: number, deckCover?: string) => any
}
type TableForPacksPropsType = {
    titleContent: Array<any> | null
    rowsContent: Array<PackType> | null
    buttonsData: Array<ButtonType>
}

export const TableForPacks = (props: TableForPacksPropsType) => {
    return (<div className={style.tableContainer}>
            {props.titleContent && props.rowsContent ? <table className={style.table1}>
                <tr>
                    {props.titleContent.map((elem) => {
                        return <th>{elem}</th>
                    })}
                </tr>
                {props.rowsContent.map((e) => {
                    return (
                        <tr>
                            <td> {e.name}</td>
                            <td> {e.cardsCount}</td>
                            <td> { e.updated.length > 11 ? e.updated.substring(0, 10) :e.updated}</td>
                            <td> {e.grade}</td>
                            <td> <Buttons id={e._id} buttonsData={props.buttonsData}/></td>
                        </tr>)

                })}

            </table> : <Preloader/>}
        </div>
    )
}


function Buttons(props: ButtonsPropsType) {


    let [deleteOpen, setDeleteOpen] = useState(false)
    let [update, setUpdateOpen] = useState(false)

    return (<div style={{
        display: "flex",justifyContent:"center",
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