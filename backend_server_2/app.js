// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//     res.send("Welcome to Backend Server 2");
// });

// app.listen(4001, ()=>{
//     console.log("listening to post 4001");
// });

const express = require('express');

const app = express();


app.post('/backend_server_2', (req, res) => {
    
    console.log('Received request from Backend Server 1');

    res.json(
        {
            message: "Hello from server 2"
        }
    );
});

app.listen(4001, () => {
    console.log('Backend Server 2 listening on port 4001');
});
