const express = require('express')

const app = express();
const port = 3000;

app.get("/",(req,res) =>{
    res.send("hello dipak hope you are enjoying the express journey");
})


app.listen(port,() =>{
    console.log(`server is running on port ${port}...`);
})