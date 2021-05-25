const express = require('express');
const cors = require('cors')
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res)=>{
res.send("hello")
})

app.listen(3000, ()=>{
    console.log('server running on port 3000');
})