import React, {useState} from "react";
import style from "./css.module.css"
import {CardsType, CardType} from "../../main/m2-bll/table-reduser";
import {Star} from "@material-ui/icons";
import {StarRead} from "../../main/m1-ui/common/Star/Star";

type CardsSideQPropsType ={
    data: Array<CardType>
    currentCard : number
}
type NewCardType = {
    number:number
    question:string
    answer:string
    grade:number
}


export const CZXC = (props:CardsSideQPropsType) => {
}