import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';


dotenv.config({
    path: '.env'
})
const app = express();
 
// allows other origins to comunocate

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"})) // converts json into js object availoable at req.body
app.use(express.urlencoded({extended:true, limit:"16kb"})) // parses url-encoded data into js object availoable at req.body
app.use(express.static("public")) // files which users have access
app.use(cookieParser()) //parses data from request headers into js object availoable at req.cookies




app.listen(process.env.PORT, ()=>{
    console.log('listenig on port', process.env.PORT);
})

export default app;