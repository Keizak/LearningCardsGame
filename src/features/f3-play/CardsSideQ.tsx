import React, {useState} from "react";
import style from "./css.module.css"
import {StarRead} from "../../main/m1-ui/common/Star/Star";

type CardsSideQPropsType = {
    currentCard: NewCardType | any
}
type NewCardType = {
    number: number
    question: string
    answer: string
    grade: number
}
const Answer = (answer: string) => {
    return (
        <div>
            <div>Answer</div>
            <div>{answer}</div>
        </div>
    )
}

export const CardsSideQ = (props: CardsSideQPropsType) => {
    const [timer, setTimer] = useState<boolean>(false)
    setTimeout(() => {
        setTimer(true)
    }, 5000)
return (<div className={style.cardPack}>
    {props.currentCard ? <>
            <div><StarRead value={props.currentCard.grade}/></div>
            <div>Question:</div>
            <div>{props.currentCard.question}</div>
            {timer ?
                <div>
                    <div>Answer :</div>
                    <div>{props.currentCard.answer}</div>
                </div> : <></>
            }
        </>
        : <></>}

</div>)
}