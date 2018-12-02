import React from 'react';

export default function Value(props){
    let {value} = props;
    return (
        <div className="counter">{value}</div>
    )
}
