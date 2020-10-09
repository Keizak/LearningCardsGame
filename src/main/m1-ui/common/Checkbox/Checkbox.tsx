import React from "react";
import "./checkbox.scss"

type MyButtonType = {
    text: string
    checked: boolean
    onClick: (check: boolean) => void
}

export function Checkbox({text, checked, onClick}: MyButtonType) {
    return <div className="checkbox-flex">
        <input checked={checked} onChange={event => onClick(event.currentTarget.checked)} type="checkbox"
               className="checkbox checkbox--blue"/><span>{text}</span>
    </div>
}
