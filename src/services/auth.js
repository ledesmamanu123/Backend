import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';

export const createHash = async (password)=>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}

export const validatePassword = async(password, hashPass)=> bcrypt.compare(password, hashPass)

export const passportCall = (strategy, options={}) =>{
    return async(req,res,next)=>{ //<===ESTE REQ,RES,NEXT LO CREO YO
        passport.authenticate(strategy,(error,user,info)=>{
            if(error) return next(error);
            if(!options.strategyType){
                console.log(`Route ${req.url} doesn't have defined a strategyType`);
                return res.sendInternalError();
            }
            if(!user) {
                //Que significa que no haya encontrado user en cada caso? 
                switch(options.strategyType) {
                    case 'jwt': //ACÁ, NO ECONTRAR UN USER, SIGINIFCA QUE AÚN NO ESTAS LOGUEADO
                        req.error = info.message?info.message:info.message.toString();
                        return next();
                    case 'locals': //ACÁ NO ENCONTRAR UN USER, ES PROBLEMA DE REGISTRO O LOGIN
                        return res.sendUnauthorized(info.message?info.message:info.toString())
                }
            }
            req.user = user;
            next();
        })(req,res,next); //<===ESTE REQ,RES,NEXT LO NECESITAMOS PARA QUE PASSPORT SE COMPORTE COMO MIDDLEWARE DE MI MIDDLEWARE
                          //Si no lo tenemos, passport nunca va a saber que es el res, req, y el next
    }
}

export const generateToken = (user) =>{
    return jwt.sign(user,'jwtSecret',{expiresIn:'1d'})
}