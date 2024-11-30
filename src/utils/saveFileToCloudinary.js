import { v2 as cloudinary } from 'cloudinary';
import env from './env.js';
import fs from 'node:fs/promises';

const cloud_name = env('CLOUDINARY_CLOUD_NAME');
const api_key = env('CLOUDINARY_API_KEY');
const api_secret = env('CLOUDINARY_API_SECRET');

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

const saveFileToCloudinary = async (file, folder) => {
  try {
    const response = await cloudinary.uploader.upload(file.path, {
      folder,
      use_filename: true,
      unique_filename: false,
    });
    return response.secure_url;
  } catch (error) {
    throw error;
  } finally {
    fs.unlink(file.path);
  }
};

export default saveFileToCloudinary;