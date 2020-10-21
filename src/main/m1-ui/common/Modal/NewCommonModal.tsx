import React from "react";
import style from "./css.module.css"

type ModalPropsType = {
    handleClose: () => void
    title?: string
    content: string
}

export const ModalWindow = (props:ModalPropsType) => {
    const handleCloseOnKey = (event: any) => {
        console.log(event.charCode)
        if(event.charCode === 13) {
            console.log("это интер")
            props.handleClose()
        }
    }
    return (
            <div className={style.Container}>
                <div className={style.Modal}>
                    {props.title ? <div className={style.title}><h1>props.title</h1></div> : null}
                    <div className={style.content} onClick={props.handleClose} >
                        {props.content}

                        {/*<div><button onKeyPress={handleCloseOnKey}>закрыть</button></div>*/}
                    </div>
                    <div className={style.prompt}>Press me to close</div>
                </div>
            </div>
    )

}