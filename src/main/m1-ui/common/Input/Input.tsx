import React from "react";
import style from "./input.module.css"

type MyInputType = {
    onChange: (e:string) =>void
    onEnterPress?:(e:string)=>void
    error:boolean
    value:string
    placeholder:string
    onBlur?: ()=>void
}

export function Input({onChange,onEnterPress, value, error, placeholder, onBlur}: MyInputType) {
    const enterEvent = (e: any) => {
        if (e.charCode === 13&&onEnterPress) {
            onEnterPress((e.currentTarget.value))
        }
    }
    return <div className={style.group}>
        <input autoFocus={true} onBlur={onBlur}  style={error?{color:"red"}:{}} value={value} onKeyPress={enterEvent} placeholder={placeholder} type="text" onChange={(e => onChange(e.currentTarget.value))}/>
        <span className={style.bar}></span>
    </div>


}

