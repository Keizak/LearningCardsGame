import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    CardType,
    getCardsTC,
} from "../../../m2-bll/table-reduser";
import {useParams} from 'react-router-dom'
import {AppRootStateType} from "../../../m2-bll/store";
import style from "./css.module.css"
import {Preloader} from "../../common/Preloader/Preloader";
import {CardsControlButtons} from "./CardsControlButtons";
import { Card } from "./Card";



function Play() {
    const dispatch = useDispatch();
    const {id} = useParams()
    const CardsData = useSelector<AppRootStateType, Array<CardType> | null>(state => state.table.cards);
    const [ansVisibility,setAnsVisibility] = useState(false)


    const openAnswer = () => {
        setAnsVisibility(true)
        setTimeout (()=> {  setAnsVisibility(false)},5000)
    }
    useEffect(() => {
        dispatch(getCardsTC({cardsPack_id: id}))
    }, [])
    const distributionCardOfGrade = () => {
        const a = Math.round(Math.random() * (100 - 1) + 1)
        if (a >= 1 && a <= 40) {
            return 1
        } else if (a >= 41 && a <= 70) {
            return 2
        } else if (a >= 71 && a <= 85) {
            return 3
        } else if (a >= 86 && a <= 95) {
            return 4
        } else if (a >= 96 && a <= 100) {
            return 5
        }
        else {return 1}
    }
    const currentCardForDraw = (rollGrade:() => 1|2|3|4|5, data: Array<CardType>):CardType => {
        const FilterArray = data.map((card)=> {
            if (card.grade === 0 ) card.grade = 1
            return card
        })
        let cards:Array<any> = []
        while (cards.length < 1)
        {
            let grade  = rollGrade()
            cards = FilterArray.filter((card) => {
                if (Math.round(card.grade) === grade) return card
            })

        }
            if (cards.length === 1) {return cards[0]}
            const a = Math.round(Math.random() * (cards.length - 2) + 1)
            return cards[a]
    }
    let card = null
    if(CardsData)if(CardsData.length >= 1) card = currentCardForDraw(distributionCardOfGrade,CardsData?CardsData:[])


    return <div className={style.Content}>
        {CardsData && card ?
            <>
                <div ><Card currentCard={card} ansVisibility={ansVisibility} openAnswer={openAnswer}/></div>
                <div ><CardsControlButtons cardId={card._id} closeAnswer={()=>setAnsVisibility(false)}/></div>
            </> : <div>Этот пак пуст !</div>}

    </div>

}


export default Play;