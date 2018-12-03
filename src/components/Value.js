import React from 'react';

export default function Value(props){
    let {value, dealer} = props;
    return (
        <div className="counter">The dealer has {dealer} and you have {value}</div>
    )
}
