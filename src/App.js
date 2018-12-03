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
      value: 0,
      buttonDisabled: false,
      aceCount: 0,
      dealer: 0,
      beer:{name:"Get a drink?"}
    }
    this.dealCard = this.dealCard.bind(this);
    this.handReset = this.handReset.bind(this);
    this.buttonReset = this.buttonReset.bind(this);
    this.dealerPlay = this.dealerPlay.bind(this);
    this.getBeer = this.getBeer.bind(this);
  }

  componentDidMount(){
    let dealerStart = Math.floor(Math.random()*(11-2)+2);
   this.setState({
     dealer: dealerStart
   })
  }
  handReset(newd){
    let dealerStart = Math.floor(Math.random()*(11-2)+2);
    this.setState({
      hand: [],
      cardCount:52,
      newDeck: newd,
      dealt: {},
      value: 0,
      aceCount: 0,
      dealer: dealerStart
    })
  }

  dealerPlay(){
    let dealerHand = this.state.dealer
    while (dealerHand <17){
      let card = Math.floor(Math.random()*(10-1)+1)
      dealerHand += card
    }
    this.setState({
      dealer: dealerHand,
      buttonDisabled: true
    })
  }
  dealCard(){
    //generate random card
    let randomId = Math.floor(Math.random()*(this.state.cardCount-1)+1);
    //compare random number to hand
    axios.get(`/api/cards?id=${randomId}`).then(res =>{
      let aceTrue = 0
      if (parseInt(res.data[0].value) === 11) {aceTrue = 1
       }else {aceTrue = 0}
      let dealtValue =  parseInt(res.data[0].value,10);
      if (dealtValue + this.state.value > 21 && (aceTrue >0 || this.state.aceCount >0))
      {dealtValue -= 10
       aceTrue -=1
      }

      this.setState({
        dealt: res.data,
        image: res.data[0].image,
        aceCount: this.state.aceCount + aceTrue,
        value: this.state.value + dealtValue,
        cardCount: this.state.cardCount-1
      })
      axios.post(`/api/hand/`,this.state.dealt).then(res => {
        this.setState({
          hand: res.data
        })
        
        axios.delete(`/api/cards?id=${randomId}`).then(res =>{
          this.setState({
            cardCount: res.data.length
          })
          let {value} = this.state  
          value >= 21
          ? this.setState({buttonDisabled: true})
          : this.setState({buttonDisabled: false})
        })
      })
    }
      
    )
  }

  buttonReset(){
    this.setState({buttonDisabled: false})
  }
    
  getBeer(){
    axios.get("https://api.punkapi.com/v2/beers/").then (res =>{
      let randomBeer = Math.floor(Math.random() * (25-1)+1)
      this.setState({
        beer: res.data[randomBeer],
        beerTrue: true
      })
    })
  }

  render() {
    let {hand, buttonDisabled} = this.state;
    // let {cardCount} = this.state;
    // console.log('render',data)
    return (
      <div className="App">
        <header className="App-header">
          <div className="topContainer">
              <Value value={this.state.value} dealer={this.state.dealer}/>
          </div>
          <div className="table">
            <div className="cardContainer">
              <DisplayHand data={hand}/>
            </div>
          </div>
          <div className="bottomContainer">
            <div className="beerContainer">
              <img className="beerPic" src={this.state.beer.image_url} />
              <div className="beerName">
                {this.state.beer.name}
              </div>
            </div> 
            <div className="buttonContainers">
              <div className="cardButtons">
                <Button click={this.dealCard} title="DEAL" disable={buttonDisabled}/>
                <Button click={this.dealerPlay} title="STAY" disable={false}/>
                <ResetDeck handReset={this.handReset} buttonReset={this.buttonReset}/>
              </div>
              <div className="drinkButtons">
                <Button click={this.getBeer} title="Get Drink" disable={false} />
              </div> 
            </div>
          </div>
        </header>

      </div>
    );
  }
}

export default App;
