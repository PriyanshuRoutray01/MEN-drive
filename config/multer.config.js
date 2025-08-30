
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary.config'); 

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'your-folder-name', 
    resource_type: 'auto',    
    type:'authenticated',
    unique_filename:true,  
    public_id: (req, file) => `${Date.now()}-${file.originalname}`, 
  },
});

const upload = multer({ storage });

module.exports = upload;
