import { CONNECTION } from './variable.js'
import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';
// give database-name
export  default async function connectdb() {
    try {
        
        const passkey = await mongoose.connect(`${CONNECTION}`);
        } 
    
        catch (error) {
        console.error('Connection error:', error.message);
    }
}
