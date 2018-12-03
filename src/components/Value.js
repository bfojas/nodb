import React from 'react';

export default function Value(props){
    let {value, dealer} = props;
    return (
        value >0
        ?<div className="counter">The dealer has {dealer} and you have {value}</div>
        :<div>Shall we play a game?</div>
    )
}
