import express from 'express'
import path from 'path'
import multer from 'multer'


const router = express.Router()


const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename : (req, file, cb) => {
        const extname = path.extname(file.originalname)
         const filename = `${file.fieldname}-${Date.now()}${extname}`
        cb(null, filename)
    },
});

const fileFilter =  (req, file, cb) => {

    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = path.extname(file.originalname).toLowerCase()
    const mimetype = file.mimetype

    if(filetypes.test(extname) && mimetypes.test(mimetype)){
        cb(null, true);
    }else{
         cb(new Error("Images only! Please upload jpeg, jpg, png, or webp files."), false);
    }
};

const upload = multer({storage, fileFilter})
const uploadSingleImage  = upload.single("image")


router.post('/',  (req, res) => {
     uploadSingleImage(req, res, (err) => {
        if(err){
            res.status(400).send({message: err.message})
        }else if (req.file){
            res.status(200).send({message : "Image uploaded successfully",
            image: `/uploads/${req.file.filename}`
            });
        }else{
            res.status(400).send({message: "No image file provided"})
        }
     })
})


export default router