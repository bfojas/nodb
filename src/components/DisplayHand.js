import React from 'react';
import Image from './Image'
export default function DisplayHand(props) {
    console.log('displayprop',props.data)
    const displayHand = props.data
    ? props.data.map((val) =>{
      return val.map(img =>{
          console.log('keys', img.code)
      return <Image code={img.code} src={img.image} />
    })}):null

    return(
        <div>{displayHand}</div>

    )
}