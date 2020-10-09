import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addCardTC,
    CardType,
    deleteCardTC,
    getCardsTC,
    gradeCardTC,
    updateCardTC
} from "../../../main/m2-bll/table-reduser";
import {Redirect, useParams} from 'react-router-dom'
import {AppRootStateType} from "../../../main/m2-bll/store";
import TableForCards from "./TableCards";
import {DeleteCardDataType, GradeCardDataType, UpdateCardDataType} from "../../../main/m3-dal/tableApi";
import {Button} from "@material-ui/core";
import AddNewCardModal from "../../../main/m1-ui/common/Modal/addNewCardModal";
import {Preloader} from "../../../main/m1-ui/common/Preloader/Preloader";


function CardPage() {
    const dispatch = useDispatch();
    const {id} = useParams()
    const isLoginIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoginIn);
    const CardsData = useSelector<AppRootStateType, Array<CardType> | null>(state => state.table.cards);
    useEffect(() => {
        dispatch(getCardsTC({cardsPack_id: id}))
    }, [])
    const addButton = (question: string, answer: string) => {
        dispatch(addCardTC({card: {cardsPack_id: id, question: question, answer: answer}}))
    }
    const playButton = (data: UpdateCardDataType) => {
        dispatch(updateCardTC(data))
    }
    const updateButton = (data: UpdateCardDataType) => {
        dispatch(updateCardTC(data))
    }
    const deleteButton = (data: DeleteCardDataType) => {
        dispatch(deleteCardTC(data))
    }
    const gradeButton = (data: GradeCardDataType) => {
        dispatch(gradeCardTC(data))
    }
    let [addCardModalOpen, setAddCardModalOpen] = useState<boolean>(false)
    return <div>
        {!CardsData ? <Preloader/> : <div>
            <AddNewCardModal text={"Do you want to create new card?"}
                             open={addCardModalOpen}
                             onButtonClick={addButton}
                             setModalOpen={setAddCardModalOpen}/>:
            <TableForCards columnsName={["question", "answer", "Grade", "updated", "Shots",
                <Button size={"small"} style={{margin: "5px", height: " 20px"}}
                        variant="contained"
                        color="primary"
                        onClick={() => setAddCardModalOpen(true)}>Add new card</Button>]}
                           rowContent={CardsData}
                           buttonsData={[
                               {name: "Update", onClick: updateButton},
                               {name: "Delete", onClick: deleteButton},
                               {name: "Grade", onClick: gradeButton},
                               {name: "Play", onClick: playButton},]}/>
        </div>}
    </div>
}


export default CardPage;