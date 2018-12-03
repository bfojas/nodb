import React from 'react';
// import axios from 'axios';

export default function Button(props){
    let {click,title,disable} = props
    return(
        <button onClick={click} disabled={disable}>{title}</button>
        
    )




}