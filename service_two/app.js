const express = require('express');
const User = require('./models/userModal');
const mongoose = require('mongoose');

const app = express();
const PORT = 4007

// MongoDB setup
mongoose.connect('mongodb://root:example_password@mongodb:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Failed to connect to MongoDB", error);
});

// API endpoint to check MongoDB
app.get('/check-mongo', (req, res) => {
    res.send('MongoDB is connected');
});

// Sample route to create a user
app.get('/create-user', async (req, res) => {
    try {
        const user = new User({
            username: 'example_user',
            email: 'user@example.com',
            password: 'password123'
        });
        const savedUser = await user.save();
        res.send('User created successfully: ' + savedUser);
    } catch (error) {
        console.error('Failed to create user', error);
        res.status(500).send('Failed to create user: ' + error.message);
    }
});


app.get('/', (req, res) => {
    // capture traceid from service one
    // create span
    res.json({
        message: 'Hello juijiWorld!'
    })
    // res.send("Welcome to Backend Server 2");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
