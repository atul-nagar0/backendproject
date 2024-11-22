import multer from "multer";

const storage = multer.diskStorage({
    destination:  function (req, file, cb){
        cb(null, 'D:/backend javascript/projecthiteshsir/public/temp')
    },
    filename: function (res, file, cb){
        cb(null, file.originalname)
    }
})
export const upload = multer({ storage: storage });