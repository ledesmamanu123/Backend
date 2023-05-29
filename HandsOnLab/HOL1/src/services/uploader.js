import multer, { diskStorage } from "multer";
import __dirname from "../utils.js";

//¿Donde voy a almacenar TODO?

const storage = multer.diskStorage({ //Ayudame a ocupar un lugar de mi disco para guardar cosas
    //Carpeta
    destination:function(req, file, cb){
        cb(null,`${__dirname}/public/img`)
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const uploader = multer({storage});

export default uploader;