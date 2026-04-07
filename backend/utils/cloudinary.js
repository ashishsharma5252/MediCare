import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

// config cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// upload image to cloudinary
export const uploadToCloudinary = async (filePath, folder="Doctors") => {
    try {
        const result = await cloudinary.uploader.upload(filePath,{
            folder,
            resource_type:"image"
        })
        fs.unlinkSync(filePath);
        return result;
    } catch (err) {
        console.error("Error uploading to Cloudinary:", err);
        throw err;
    }
}


// delete image from cloudinary
export const deleteFromCloudinary = async (publicId) => {
    try {
        if(!publicId) return;
        await cloudinary.uploader.destroy(publicId);
    } catch (err) {
        console.error("Error deleting from Cloudinary:", err);
        throw err;
    }
}

export default cloudinary;