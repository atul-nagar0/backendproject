
import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
// give database-name
export  default async function connectdb() {
    try 
    {
        
        const passkey = await mongoose.connect(`${process.env.CONNECTION}/${DB_NAME}`);
        
    } 
    
    catch (error) {
        console.error('Connection error:', error.message)
    }
}
