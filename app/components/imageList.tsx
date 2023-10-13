// imageList.js

import fs from 'fs';

// Function to get a list of image files from the public/image directory
export default function  getImageList() {
  const imageDirectory = './public/images'; // Change this path as needed

  try {
    const files = fs.readdirSync(imageDirectory);
    const imageList = files.map((file) => `/images/${file}`);
    return imageList;
  } catch (error) {
    console.error('Error reading the image directory:', error);
    return [];
  }
}
