

let hand = [];
let data = require('../cards.json');
const fullData = data.slice();

module.exports = {
    
    deal:  (req,res) => {
        const {id} = req.query;
        console.log('reqquiry',data[1])
        console.log('id', parseInt(id,10))
        let dealt = [data[id]]
        console.log('dealt',dealt)
        
        // filter((card) =>{
        //     return card.id === id
        //     ?  true
        //     :  false
        // })
        res.send(dealt)
    },
    hand: (req,res) => {
        hand.push(req.body)
        res.send(hand)
    },
    
    removeCard: (req,res) =>{
        const {id} = req.query;
        let dealt = parseInt(id)

        data = data.filter((val,i) => {
            let match = parseInt(val.id)
           return match !== dealt
        })
        console.log(data)
        console.log('dealt',dealt)
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
    },

    // ,
    // fresh: (req,res) =>{
    //     console.log('newdeck body',req.body.original.length)
    //     res.send(data)
    // }

}