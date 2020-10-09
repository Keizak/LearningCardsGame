import React from "react";
import style from "./css.module.css"
import {Box} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";


type StarReadPropsType ={
    value:number
}
type StarChangePropsType ={
    value:number
    setValue: (value:any) => void
}

export const StarRead= (props:StarReadPropsType) => {
    return (<Box component="fieldset" mb={3} borderColor="transparent">
    <Rating name="read-only" value={props.value} readOnly />
    </Box>)
}
export const StarChange= (props:StarChangePropsType) => {
    return (<Box component="fieldset" mb={3} borderColor="transparent">
        <Rating name="simple-controlled"
                value={props.value}
                onChange={(event, newValue) => {
                    props.setValue(newValue)}}/>
    </Box>)
}