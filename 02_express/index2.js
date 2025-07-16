const express = require('express');
const app = express();

const port = 3000;

app.use(express.json())

let nextId = 1;
let teaData = [];


// add a new tea
app.post('/',(req,res) =>{
     
    const {name,price} = req.body;
    const newTea = {id:nextId++ , name,price}
    teaData.push(newTea);
    // res.status(201).send(newTea);
    res.send(teaData);
})


// to get the all teas
app.get('/tea',(req,res) =>{
   
       res.status(201).send(teaData);
})

// to update tea
app.put('/teas/:id',(req,res) =>{
     
    const tea = teaData.find(t => t.id === parseInt(req.params.id))  // return a object which matches a id 

    if(!tea){
        return res.status(404).send("tea not found")
    }

    const {name,price} = req.body;
    tea.name = name;
    tea.price = price 
    res.status(200).send(tea);
})

// to delete tea
app.delete('/teas/:id',(req,res)  =>{
      
    const teaIndex =  teaData.findIndex(t => t.id === parseInt(req.params.id));  // return an index where id matches 

    if(teaIndex == -1){
         return res.status(404).send("tea not found")
    }

    teaData.splice(teaIndex,1);
    return res.status(204).send('deleted');
})


app.listen(port , () =>{
     
    console.log(`server is running on port:# ${port}`);
})