const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to Backend Server 2");
});

app.listen(4001, ()=>{
    console.log("listening to post 4001");
});