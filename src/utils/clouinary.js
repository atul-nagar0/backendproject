import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config(
    { cloud_name: process.env.CLOUD_NAME,
         api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_SECRET_KEY
    });


const uploadoncloudinary = async (localpath) => {
    try
    {
    if(!localpath) return null;
    const response = await cloudinary.uploader.upload(localpath,  {
        resource_type : "auto"
    })
// problem accured in resource_type : auto <- before 
    
    fs.unlinkSync(localpath)
    return response;
    
}

    catch(err){
        fs.unlinkSync(localpath)
        return null;
    }
}

export {uploadoncloudinary,};