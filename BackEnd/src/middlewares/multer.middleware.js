import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log("Destination function triggered");
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      console.log("File received:", file.originalname);
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
})