import React, {useState} from "react";
import {CardType, PackType} from "../../../m2-bll/table-reduser";
import {Preloader} from "../../common/Preloader/Preloader";
import style from "./Table.module.css";
import SimpleModal from "../../common/Modal/modal";
import {Button} from "@material-ui/core";
import {buttonStyle} from "../a1-TableOfPacks/oldTablePacks";
import SimpleModalInput from "../../common/Modal/modalInput";




type ButtonsPropsType = {
    buttonsData: Array<ButtonType>
    cardId: string
    PackId: string
}
type ButtonType = {
    name: string
    onClick?: (data: any, name?: string, rating?: number, grade?: number, deckCover?: string) => any
}
type TableForPacksPropsType = {
    titleContent: Array<any> | null
    rowsContent: Array<CardType> | null
    buttonsData: Array<ButtonType>
}

export const TableOfCards = (props: TableForPacksPropsType) => {
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
                            <td> {e.question}</td>
                            <td> {e.answer}</td>
                            <td> {e.grade}</td>
                            <td> { e.updated.length > 11 ? e.updated.substring(0, 10) :e.updated}</td>
                            <td> {e.shots}</td>
                            <td> <Buttons cardId={e._id} PackId={e.cardsPack_id} buttonsData={props.buttonsData}/></td>
                        </tr>)

                })}

            </table> : <Preloader/>}
        </div>
    )
}


function Buttons(props: ButtonsPropsType) {
    let [deleteOpen, setDeleteOpen] = useState(false)
    let [update, setUpdateOpen] = useState(false)
    return (
        <div style={{display: "flex",justifyContent:"center",alignItems:"center"}}>
            {props.buttonsData.map((i) => {
                let onclick = i.onClick
                switch (i.name) {
                    case "Delete":
                        const DeleteHandler = () => {
                            if (onclick) onclick({cardId: props.cardId, packId: props.PackId})
                        }
                        return (<>
                                <SimpleModal text={"Do you want to delete pack?"}
                                             open={deleteOpen}
                                             onButtonClick={DeleteHandler}
                                             setModalOpen={setDeleteOpen}/>
                                <Button size={"small"}
                                        style={buttonStyle}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setDeleteOpen(true)}>{i.name}</Button>
                            </>
                        )
                    case "Update":
                        const UpdateHandler = (question?: string) => {
                            if (onclick) onclick({card: {_id: props.cardId, question: question}, packId: props.PackId})
                        }
                        return (<>
                                <SimpleModalInput text={"Do you want to update pack?"}
                                                  open={update}
                                                  onButtonClick={UpdateHandler}
                                                  setModalOpen={setUpdateOpen}/>
                                <Button size={"small"}
                                        style={buttonStyle}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setUpdateOpen(true)}>{i.name}</Button>
                            </>
                        )
                }
            })}
        </div>)
}