import React, {useState} from "react";
import style from "./css.module.css";

type PaginatorPropsType ={
    maxPages: number
    startValue: number
    endValue:number
    goStart : () => void
    goFinish : () => void
    goPage : (value:number) => void
}
const Paginator = (props:PaginatorPropsType) => {
    let i =props.startValue
    let buttons: Array<any> = []
    for ( i;i <= props.maxPages;i++ ) {
    buttons[i] = i}
    return (
        <div className={style.Main}>
        <div className={style.Pagination}>
            <button className={style.startButton} onClick={props.goStart}>Start</button>
            {buttons.map((b)=>{
                let goPage = props.goPage
                function Handler(){goPage(b)}
                if (b <= props.endValue) return <button onClick={Handler}>{b}</button>
            })}
            <button className={style.endButton} onClick={props.goFinish}>End</button>
        </div>
        </div>
    )
}

export default Paginator