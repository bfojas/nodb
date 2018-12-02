import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import DisplayHand from './components/DisplayHand';
import ResetDeck from './components/ResetDeck';
import Button from './components/Button'


class App extends Component {
  constructor(){
    super();
    this.state = {
      hand: [],
      dealtCard: {},
      cardCount: 52,

    }
    this.dealCard = this.dealCard.bind(this);
    this.handReset = this.handReset.bind(this);
  }

  componentDidMount(){
    // axios.get('api/cards',).then(res =>{
    // })
  }
  handReset(newd){
    console.log('reset hit', this.state)
    this.setState({
      hand: [],
      cardCount:52,
      newDeck: newd,
      dealt: {}
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
    //get random card
    axios.get(`/api/cards?id=${randomId}`).then(
      res =>{console.log('test',res.data);
      this.setState({
        dealt: res.data,
        image: res.data.image
      })
      let image = this.state.image
      axios.post(`/api/hand`,this.state.dealt).then(res => {
        this.setState({
          hand: res.data
        })
        axios.delete(`/api/cards/?image=${image}`).then(res =>{
          this.setState({
            cardCount: res.data.length
          })
    
        })
      // })
    })


  })}
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
