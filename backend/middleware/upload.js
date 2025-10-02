const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Get absolute path to upload directory
const baseDir = process.cwd();
const uploadDir = path.join(baseDir, 'uploads', 'profiles');

console.log('Upload directory path:', uploadDir);

// Ensure upload directories exist
const createUploadDirs = () => {
  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log(`✅ Created upload directory: ${uploadDir}`);
    } else {
      console.log(`✅ Upload directory exists: ${uploadDir}`);
    }
    
    // Check write permissions
    const testFile = path.join(uploadDir, 'test-write.txt');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    console.log('✅ Write permissions confirmed');
    
  } catch (error) {
    console.error('❌ Error creating/accessing upload directory:', error);
  }
};

createUploadDirs();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Destination called for file:', file.originalname);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    try {
      const timestamp = Date.now();
      const random = Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname).toLowerCase();
      
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      if (!allowedExtensions.includes(extension)) {
        return cb(new Error('Invalid file type. Only JPG, JPEG, PNG, GIF, and WebP are allowed.'));
      }
      
      const filename = `${timestamp}-${random}${extension}`;
      console.log('Generated filename:', filename);
      cb(null, filename);
    } catch (error) {
      console.error('Error generating filename:', error);
      cb(error);
    }
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  try {
    console.log('🔍 Filtering file:', file.originalname, 'MIME:', file.mimetype);
    
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    
    const allowedMimes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/webp'
    ];
    
    if (!allowedMimes.includes(file.mimetype)) {
      return cb(new Error('Invalid image format. Only JPEG, PNG, GIF, and WebP are supported.'), false);
    }
    
    console.log('File accepted:', file.originalname);
    cb(null, true);
  } catch (error) {
    console.error('File filter error:', error);
    cb(error);
  }
};

// Configure multer
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { 
    fileSize: 5 * 1024 * 1024,
    files: 1
  }
});

// Utility functions
const deleteUploadedFile = (filename) => {
  if (!filename) return;
  
  const filePath = path.join(uploadDir, filename);
  
  fs.unlink(filePath, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log(`File not found for deletion: ${filename}`);
      } else {
        console.error(`Error deleting file ${filename}:`, err);
      }
    } else {
      console.log(`Successfully deleted file: ${filename}`);
    }
  });
};

const checkFileExists = (filename) => {
  if (!filename) return false;
  const filePath = path.join(uploadDir, filename);
  return fs.existsSync(filePath);
};

const getFileInfo = (filename) => {
  if (!filename) return null;
  const filePath = path.join(uploadDir, filename);
  try {
    const stats = fs.statSync(filePath);
    return {
      exists: true,
      size: stats.size,
      path: filePath
    };
  } catch (error) {
    return {
      exists: false,
      error: error.message
    };
  }
};

// ONLY EXPORT MIDDLEWARE, NO ROUTES
module.exports = {
  upload,
  deleteUploadedFile,
  checkFileExists,
  getFileInfo,
  uploadDir
};