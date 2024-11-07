import connectdb from "./db/connectionscript";


connectdb()
.then()
.catch((err)=>{
    console.log('Mongodb connection failed due to', err.message)
})

