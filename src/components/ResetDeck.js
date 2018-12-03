import React, {Component} from 'react';
import axios from 'axios';
import Button from './Button'

class ResetDeck extends Component{
    constructor(){
        super()
        this.state = {
            newDeck: [],
            original:[]
        }
        this.getOrigin = this.getOrigin.bind(this);
    }
    getOrigin(){
        this.props.buttonReset()
        axios.get(`/api/reset`).then(res =>{
            
            this.setState({
                original: res.data
            })
        let {original} = this.state
        axios.put(`/api/reset`,{original}).then(res =>{
            this.setState({
                newDeck: res.body
            })
            this.props.handReset(original)
            
        })

        })
    }


    render(){

        return(
            
                <Button click={this.getOrigin} title="RESET" disable={false}/>
            

            )}
}
export default ResetDeck