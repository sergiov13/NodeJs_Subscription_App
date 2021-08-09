
//imports 
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const emailScheduler = require('./utils/emailScheduler.js')
require('dotenv').config();

//Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;
const URI = process.env.ATLAS_URI;

mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

//Starting connection with DB
const connection = mongoose.connection;
try {
    connection.once('open', () => {
        console.log('MongoDB connection established successfully');
    })
} catch (err){
    console.log(err);
}

//router for subscriptions endpoint
const subscriptionRouter = require('./routes/subscriptions');

app.use('/subscription', subscriptionRouter);

//Start server listening
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    emailScheduler();
})


//Home endpoint
app.get('/',(req,res) => {
    console.log("Incoming GET");
    res.status(200).json({Hello: "world"});
})