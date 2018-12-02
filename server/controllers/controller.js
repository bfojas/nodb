

let hand = [];
let data = require('../cards.json');
const fullData = data.slice();

module.exports = {
    
    deal:  (req,res) => {
        const {id} = req.query;
    
        let dealt = data.filter((card) =>{
            return card.id === id
            ?  true
            :  false
        })
        res.send(dealt)
    },
    hand: (req,res) => {
        hand.push(req.body)
        res.send(hand)
    },
    
    removeCard: (req,res) =>{
        console.log('rem',req.params.id)
        const {id} = req.params;
        data = data.filter(val => {
           return val.id !== id
        })
        res.send(data)
    },

    getOrigin: (req,res) =>{
        res.send(fullData)
    },

    newDeck: (req,res) =>{
        hand = [];
        data = req.body.original.slice()
       res.send(data)
        // console.log(req.body)
    }
    // ,
    // fresh: (req,res) =>{
    //     console.log('newdeck body',req.body.original.length)
    //     res.send(data)
    // }

}