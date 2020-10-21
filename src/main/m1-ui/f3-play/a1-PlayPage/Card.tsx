import React, {useState} from "react";
import style from "./css.module.css"
import {StarRead} from "../../common/Star/Star";

type CardsSideQPropsType = {
    currentCard: NewCardType | any
    ansVisibility:boolean
    handleOpen: () => void
    handleClose: () => void
}
type NewCardType = {
    number: number
    question: string
    answer: string
    grade: number
}
export const Card= (props: CardsSideQPropsType) => {

return (<div className={style.cardPack} >
    <div className={style.cardBorder}>
        <div className={style.stars}><StarRead value={props.currentCard.grade}/></div>
        <div className={style.question}>Question:<br/>{props.currentCard.question} ?</div>
        <div className={style.answer}><button onClick={props.handleOpen} >Open answer</button></div>
    </div>
</div>)
}