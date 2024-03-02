const express = require('express');
const axios = require('axios');

const app = express();

app.get('/trigger', async(req, res) => {
    try{
        const r = await axios.post('http://localhost:4001/backend_server_2');
        // res.send('Request to Backend Server 2 Successful');
        res.json(r.data)
    } catch (error){
        console.error('Error making request to Backend Server 2:', error);
        res.status(500).send('Error making Backend Server 2');
    }
});

app.listen(4000, ()=>{
    console.log("listening to post 4000");
});