import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    }); 


const uploadToCloudinary = async (localFilePath) => {
    const uploadResult = await cloudinary.uploader
       .upload(localFilePath, {
               resource_type: 'auto',
           }
       )
       .catch((error) => {
            console.log(error);
           fs.unlink(localFilePath);
           return null;
       });

    fs.unlinkSync(localFilePath);
    return uploadResult;
}


export {uploadToCloudinary};