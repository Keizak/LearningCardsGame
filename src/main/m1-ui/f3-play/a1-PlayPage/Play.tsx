import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    CardType,
    getCardsTC,
} from "../../../m2-bll/table-reduser";
import {useParams} from 'react-router-dom'
import {AppRootStateType} from "../../../m2-bll/store";
import style from "./css.module.css"
import {CardsControlButtons} from "./CardsControlButtons";
import {Card} from "./Card";
import {Preloader} from "../../common/Preloader/Preloader";
import {ModalWindow} from "../../common/Modal/NewCommonModal";


function Play() {
    const dispatch = useDispatch();
    const {id} = useParams()
    const CardsData = useSelector<AppRootStateType, Array<CardType> | null>(state => state.table.cards);
    const [ansVisibility, setAnsVisibility] = useState(false)
    const [card, setCurrentCard] = useState<any>(null)

    const handleClose = () => {
        console.log('я закрылась')
        setAnsVisibility(false);
    };
    const handleOpen = () => {
        setAnsVisibility(true)
    }
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
        } else {
            return 1
        }
    }
    const currentCardForDraw = (rollGrade: () => 1 | 2 | 3 | 4 | 5, data: Array<CardType>): CardType => {
        const FilterArray = data.map((card) => {
            if (card.grade === 0) card.grade = 1
            return card
        })
        let cards: Array<any> = []
        while (cards.length < 1) {
            let grade = rollGrade()
            cards = FilterArray.filter((card) => {
                if (Math.round(card.grade) === grade) return card
            })

        }
        if (cards.length === 1) {
            return cards[0]
        }
        const a = Math.round(Math.random() * (cards.length - 2) + 1)
        return cards[a]
    }
    const randomCard = (CardsData: any) => {
        console.log("я вычислила карточку")
        if (CardsData) {
            if (CardsData.length >= 1) return currentCardForDraw(distributionCardOfGrade, CardsData ? CardsData : [])
        }
    }
    const nextCard = () => {
        dispatch(getCardsTC({cardsPack_id: id}))
        setCurrentCard(randomCard(CardsData))
    }

    useEffect(() => {
        dispatch(getCardsTC({cardsPack_id: id}))
    }, [])

    if (CardsData) if (!card) setCurrentCard(randomCard(CardsData))

    return <div className={style.Content}>
        {CardsData && card ?
            <>
                <div><Card currentCard={card} ansVisibility={ansVisibility} handleOpen={handleOpen}
                           handleClose={handleClose}/></div>
                <div><CardsControlButtons cardId={card._id} nextCard={nextCard}/></div>
                {ansVisibility ? <ModalWindow handleClose={handleClose} content={card.answer}/> : <></>}
            </> : <Preloader/>}

    </div>

}


export default Play;