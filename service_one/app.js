const express = require('express');
const app = express();

app.get('/feed', async (req, res) => {
    const res = await fetch('http://localhost:4004/')

    res.json(res)
});

app.listen(4000, ()=>{
    console.log("listening to post 4000");
});