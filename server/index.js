const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const controller = require("./controllers/controller.js")
const PORT = 4000;
let data = require('./cards.json');
const fullData = data.splice();


// let hand = [];

// console.log(data)

app.use(bodyParser.json());
// app.get(`api/reset`, (req,res) =>{

// }


// )
app.get(`/api/cards`, controller.deal);
app.get(`/api/reset`, controller.getOrigin);
// app.put(`/api/cards`, controller.fresh)
app.put(`/api/reset`, controller.newDeck);
app.post(`/api/hand/`, controller.hand);
app.delete(`/api/cards/:id`, controller.removeCard);





app.listen(PORT, () => console.log(`listening to ${PORT}`));
