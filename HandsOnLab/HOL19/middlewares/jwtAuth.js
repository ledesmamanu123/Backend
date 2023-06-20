import jwt from 'jsonwebtoken';

export const authToken = (req,res,next)=>{
    //Tomamos los headers

    const authHeader = req.headers.authorization;
    if(!authHeader) res.status(401).send({status:"error", error:"Not authenticated"})
    const token = authHeader.split(" ")[1]; //JWT usa los bearer token, siginifa q por convension les agrega la palabra bearer adelante del token. Por eso utilizamos un split, separamos el bearer [0] del token, y el token queda en la posicion[1]
    //Ya con el token, verificamos si es valido
    jwt.verify(token,"jwtSecret", (error, credentials)=>{
        if(error) res.status(401).send({error:"Token invalido"})
        //Creo al usuario
        req.user = credentials.user;
        next();
    })
}