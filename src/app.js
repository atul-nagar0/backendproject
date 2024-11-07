import express from 'express';
import PORT from 'variable.js'

const app = express();

app.get('/', (req,res)=>{
    res.send('connected to database')
})

app.listen(PORT, ()=>{
    console.log('listenig on port', PORT);
})

