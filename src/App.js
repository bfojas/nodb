import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import DisplayHand from './components/DisplayHand';
import ResetDeck from './components/ResetDeck';
import Button from './components/Button'
import Value from './components/Value'


class App extends Component {
  constructor(){
    super();
    this.state = {
      hand: [],
      dealtCard: {},
      cardCount: 52,
      image:"",
      value: 0
    }
    this.dealCard = this.dealCard.bind(this);
    this.handReset = this.handReset.bind(this);
  }

  componentDidMount(){
  
  }
  handReset(newd){
    console.log('reset hit', this.state)
    this.setState({
      hand: [],
      cardCount:52,
      newDeck: newd,
      dealt: {},
      value: 0
    })
    // axios.put(`/api/cards`, this.state.newDeck)
    // .then(res =>{
    // })
    console.log('app reset', this.state)
  }
  // makeHand(){
  //   axios.post('api/cards', card).then(res =>{
  //     this.setState({
  //       hand: res
  //     })
  //   })

  // }
  dealCard(){
    
    //generate random card
    let randomId = Math.floor(Math.random()*(52-1)+1);
    console.log('hand', randomId)
    //compare random number to hand
    // let goneCheck = this.state.hand.filter(val =>{
        // return val[0].id === randomId
    // })
    // console.log('gone', goneCheck)
    //get random card
    // if (goneCheck.length <2){
    axios.get(`/api/cards?id=${randomId}`).then(res =>{
      this.setState({
        dealt: res.data,
        image: res.data[0].image,
        value: this.state.value + parseInt(res.data[0].value,10)
      })
      console.log('value', res.data)
      axios.post(`/api/hand/`,this.state.dealt).then(res => {
        this.setState({
          hand: res.data
        })
        
        axios.delete(`/api/cards/${randomId}`).then(res =>{
          this.setState({
            cardCount: res.data.length
          })
        })
    })
  })
// }
  // else{null}
}
  // reset(){
  //   axios.get(`/api/reset`).then(res =>{
  //     this.setState({

  //     })
  //   })

  // }



  render() {
    let {hand} = this.state;
    // let {cardCount} = this.state;
    // console.log('render',data)
    return (
      <div className="App">
        <header className="App-header">
        <Value value={this.state.value}/>
          Shall we play a game?
          <div className="cardContainer">
            <DisplayHand data={hand}/>
          </div>
          <div>
            <Button click={this.dealCard} title="Deal"/>
            <ResetDeck handReset={this.handReset}/>
            </div>
        </header>

      </div>
    );
  }
}

export default App;
