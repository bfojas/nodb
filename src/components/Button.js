import React from 'react';
// import axios from 'axios';

export default function Button(props){
    let {click,title} = props
    return(
        <button onClick={click}>{title}</button>
        
    )




}