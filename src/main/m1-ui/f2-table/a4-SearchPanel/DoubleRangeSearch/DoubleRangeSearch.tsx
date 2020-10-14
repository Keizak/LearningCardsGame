import React, {useState} from 'react';
import InputRange, {Range} from "react-input-range";
import "react-input-range/lib/css/index.css"

type RangeSliderPropsType ={
    value: Range | number
    setValue: (value:Range| number) => void
}
export function RangeSlider(props:RangeSliderPropsType) {

    return (
        <InputRange
            draggableTrack
            maxValue={20}
            minValue={0}
            value={props.value}
            onChange={value => {props.setValue(value)}} />
    );}
