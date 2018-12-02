

let hand = [];
let data = require('../cards.json');
const fullData = data.slice();

module.exports = {
    deal:  (req,res) => {
        console.log('query',req.query)
        const {id} = req.query;
    
        let dealt = data.filter((card) =>{
            return card.id === id
            ?  true
            :  false
        })
        console.log('dealt',dealt)
        res.send(dealt)
    },
    hand: (req,res) => {
        console.log('hand controller', req.body)
        hand.push(req.body)
        res.send(hand)
    },
    
    removeCard: (req,res) =>{
        // console.log('rem',req.params.id)
        const {image} = req.query;
        data = data.filter(val => {
           return val.image !== image
        })
        console.log('delete')
        res.send(data)
    },

    getOrigin: (req,res) =>{
        console.log('full',fullData.length)
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