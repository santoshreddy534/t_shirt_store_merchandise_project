const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hey')
})

app.listen(port, ()=>{
    console.log('server running on '+port);
})