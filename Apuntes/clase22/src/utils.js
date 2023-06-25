import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';


//Creamos un token
export const generateToken = (user)=>{
    //jwt.sign({QUE VOY A GUARDAR}, CON QUE SECRET LO GUARDO, CUANTO PARA QUE EXPIRE)
    const token = jwt.sign(user, "jwtSecret", {expiresIn:'24h'})
    return token;
}

//Passport como Middleware
export const passportCall = (stategy, options)=>{
    return async(req,res,next)=>{
        passport.authenticate(stategy,(error,user,info)=>{
            if(error) return next(error); //Si hay un error, mostrarlo

            //if(!user)return res.status(401).send({status:"error", message:info.message?info.message:info.toString()}) //si hay message, mostrarlos, sino, pasarlo a string
            if(!user) {
                if(options.redirect) return res.redirect(options.redirect)
                return res.status(401).send({status:"error", message:info.message?info.message:info.toString()})
            }
            req.user = user; //creamos el user nostros
            next();
        })(req,res,next);
    }
}

export const cookieExtractor = (req) =>{
    let token = null; //Aca va a venir el token, si lo encuentra
    if(req&&req.cookies){
        token = req.cookies['authToken']
    }
    return token;
}

export const createHash = async (password) =>{
    //Generar los Salts
    const salts = await bcrypt.genSalt(10); //Cantidad de veces q las salts se van a mezclar con la pass
    return bcrypt.hash(password,salts);
}

export const validatePassword = async (password, hashedPass) =>{
    return bcrypt.compare(password, hashedPass) //Comparamos y verificamos q la contraseña sea correcta.
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;