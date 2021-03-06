import React, {useEffect, useState} from "react";
import {StarChange} from "../../common/Star/Star";
import style from "./css.module.css"
import {useDispatch} from "react-redux";
import {gradeCardTC} from "../../../m2-bll/table-reduser";

type CardsControlButtonsPropsType = {
    cardId: any
    nextCard: () => void
}

export function CardsControlButtons(props: CardsControlButtonsPropsType) {
    const [value, setValue] = useState<1|2|3|4|5>(1)
    const dispatch = useDispatch()

    const nextCard = () => {
        dispatch(gradeCardTC({grade: value, card_id: props.cardId}))
        setValue(1)
        props.nextCard()
    }
    return (
        <div className={style.controlButton}>
            <div className={style.buttonNext}>
                <button onClick={nextCard}>Next Card</button>
            </div>
            Choose how well you answered the question
            <div className={style.starsGo}>
                <StarChange value={value} setValue={setValue}/>
            </div>
        </div>
    )
}