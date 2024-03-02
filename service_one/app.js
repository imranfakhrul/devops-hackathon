const express = require('express');
const app = express();
const PORT = 8080

app.get('/feed', async (req, res) => {
    // create traceid
    // create parent span
    // propagate traceid to service two
    try {
        const response = await fetch('http://localhost:4007/')
        const data = await response.json()
        res.json(data)
    }catch (err) { 
        console.log(err)
    }

});

app.get('/',(req,res) =>{
    res.json({mess:"Hello, world!"})
})

app.listen(PORT, ()=>{
    console.log(`listening to post${PORT}`);
});