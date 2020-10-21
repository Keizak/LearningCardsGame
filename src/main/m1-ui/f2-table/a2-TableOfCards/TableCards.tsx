import style from "./css.module.css";
import React, {useState} from "react";
import {CardType} from "../../../m2-bll/table-reduser";
import SimpleModal from "../../common/Modal/modal";
import SimpleModalInput from "../../common/Modal/modalInput";
import {Button} from "@material-ui/core";
import {Preloader} from "../../common/Preloader/Preloader";
import {buttonStyle} from "../a1-TableOfPacks/oldTablePacks";

type ButtonType = {
    name: string
    onClick?: (data: any) => any
}

type ButtonsPropsType = {
    buttonsData: Array<ButtonType>
    cardId: string
    PackId: string
}

function Buttons(props: ButtonsPropsType) {
    let [deleteOpen, setDeleteOpen] = useState(false)
    let [update, setUpdateOpen] = useState(false)
    return (
        <div style={{display: "flex"}}>
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

type columnsNamePropsType = {
    Content: Array<any>
    TableHeight: string
    TableWidth: string
    CardsCount: number
}

function ColumnsName(props: columnsNamePropsType) {
    return (<div className={style.Content}>
        {props.Content.map((e: any) => {
            return <div style={{
                width: `calc(${props.TableWidth}/${props.Content.length})`,
                height: `calc(${props.TableHeight}/${props.CardsCount})`,
                textAlign: 'center',
            }}><p>{e}</p></div>
        })}
    </div>)
}

type RowContentPropsType = {
    Data: Array<CardType> | null
    buttonsData: any
    TableHeight: string
    TableWidth: string
    CardsCount: number
}

function RowContent(props: RowContentPropsType) {
    let update = ""
    let grade = 0
    return (<>
        {props.Data === null ? <Preloader/> :
            props.Data.map((i) => {
                if (i.updated.length > 11) update = i.updated.substring(0, 10)
                else update = i.updated
                grade = Math.round(i.grade)
                return <ColumnsName
                    CardsCount={props.CardsCount}
                    TableHeight={props.TableHeight} TableWidth={props.TableWidth}
                    Content={[i.question, i.answer, grade, update, i.shots,
                        <Buttons cardId={i._id} PackId={i.cardsPack_id} buttonsData={props.buttonsData}/>]}/>
            })}
    </>)
}

type TablePropsType = {
    columnsName: Array<any>
    rowContent: Array<CardType> | null
    buttonsData: Array<ButtonType>
}

function TableForCards(props: TablePropsType) {
    let CardsCount = 0
    let TableWidth = ""
    let TableHeight = ""
    if (window.matchMedia("(min-width: 1200px)").matches) {
        TableWidth = "90vw"
        TableHeight = "75vh"
    } else {
        TableWidth = "90vw"
        TableHeight = "75vh"
    }
    if (props.rowContent) CardsCount = props.rowContent.length
    return (
        <div className={style.Table}>
            <div className={style.HeaderTable}>
                <ColumnsName Content={props.columnsName}
                             TableHeight={TableHeight} TableWidth={TableWidth}
                             CardsCount={CardsCount}/>
            </div>
            <div className={style.ContentTable}>
                <RowContent Data={props.rowContent} buttonsData={props.buttonsData}
                            TableHeight={TableHeight} TableWidth={TableWidth}
                            CardsCount={CardsCount}/>
            </div>
        </div>

    )
}


export default TableForCards;
