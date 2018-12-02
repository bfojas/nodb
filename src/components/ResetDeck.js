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
        
        axios.get(`/api/reset`).then(res =>{
            
            this.setState({
                original: res.data
            })
        let {original} = this.state
        axios.put(`/api/reset`,{original}).then(res =>{
            console.log('get original', original)
            this.setState({
                newDeck: res.body
            })
            console.log('reset state', this.state.original)
            this.props.handReset(original)
            
        })

        })
    }


    render(){

        return(
            <div>
                <Button click={this.getOrigin} title="Reset"/>
            </div>

            )}
}
export default ResetDeck