import connectdb from "./db/connectionscript.js";
import app from "./app.js";
import { userinforouter } from "./routes/user.route.js";

connectdb()
.then(
    console.log('connected to database')
)
.catch( (err) => {
    console.log('Mongodb connection failed due to', err.message)}
)

app.get('/', (req, res)=>{
    res.send('hello, there')
}) 

app.use('/api/v1/user', userinforouter);