const express = require('express');
const app = express();
const router = require('./Router/routes')

app.get('/',(req , res)=>{
    res.json({
        hello : 'hello'
    })
})
app.use('/api/v1/' , router);

app.listen(5000 , ()=>{
    console.log("http://localhost:5000");
})