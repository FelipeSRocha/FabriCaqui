import React from 'react';

export function DropDownBtn(text:String, onClick:()=>void){
    return(
        <button onClick={onClick}>
            {text}
        </button>
    )
}