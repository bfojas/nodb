import React from 'react';

export default function Image(props){
    let {src, code} = props
    return( <img className="cardImages" src={src} key={code} alt={code}/>)
}