const express = require('express');
const app = express();
const PORT = 4005

app.get('/feed', async (req, res) => {
    // create traceid
    // create parent span
    // propagate traceid to service two
    const response = await fetch('http://localhost:4007/')
    const data = await response.json()

    res.json(data)
});

app.get('/',(req,res) =>{
    res.json({mess:"hello ismail"})
})

app.listen(PORT, ()=>{
    console.log(`listening to post${PORT}`);
});