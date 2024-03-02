const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to Backend Server 1");
});

app.listen(4000, ()=>{
    console.log("listening to post 4000");
});