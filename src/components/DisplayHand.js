import React from 'react';
import Image from './Image'
export default function DisplayHand(props) {
    const displayHand = props.data
    ? props.data.map((val) =>{
      return val.map(img =>{
      return <Image code={img.code} src={img.image} />
    })}):null

    return(
        <div>{displayHand}</div>

    )
}