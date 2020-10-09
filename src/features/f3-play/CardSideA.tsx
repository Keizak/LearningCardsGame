import React, {useState} from "react";
import style from "./css.module.css"
import {CardsType, CardType} from "../../main/m2-bll/table-reduser";
import {Star} from "@material-ui/icons";
import {StarRead} from "../../main/m1-ui/common/Star/Star";

type CardsSideAPropsType ={
    data: Array<CardType>
    currentCard : number
}
type NewCardType = {
    number:number
    question:string
    answer:string
    grade:number
}


export const CardsSideA = (props:CardsSideAPropsType) => {
    const [value,setValue] = useState<number>(2)
    let AllCards:Array<NewCardType> = props.data.map((card,i)=>{
        card.number = i
        return {number:card.number,
            question:card.question,
            answer:card.answer,
            grade:card.grade}
    })
    console.log(AllCards)
    let content = AllCards.filter((card,i)=>{
        if (card.number === props.currentCard) return card
    })
    console.log(content)
    return (<div className={style.cardPack}>
        {content.map((card)=>{
            return <div className={style.cardPack}>
                <div><StarRead value={card.grade}/></div>
                <div>Question:</div>
                <div>{card.question}</div>
            </div>
        })}
    </div>)
}