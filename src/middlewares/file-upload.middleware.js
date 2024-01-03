import multer from "multer";
import path from 'path';

//Multer's diskStorage function takes object of two objects, destination and filename.
//Both of these objects receive three paramete; req, file, cb. where file contains the properties of the file uploaded by the client. callback function takes two parameters; an error string and destination address in case of destination object and filename in case of filename object.

//Below is the storage configuration that is accepted as a parameter by the multer instance.
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(path.join('public', 'resume'))); //Here null means no errors. and second parameter is for the storage location where we want to store the client uploaded files.
    },
    filename: (req, file, cb) => {
      const fileName = Date.now() + "-" + file.originalname;
      cb(null, fileName);
    },
  });
  
  //The multer instance accepts the storage configuration as an object.
  export const fileUpload = multer({ storage: storageConfig });