export const privacy = (privacyType) => {
    return (req, res, next) =>{
        const {user} = req.session;
        console.log(user)
        switch (privacyType) {
            case 'PRIVATE':
            //Esta validacion es para dejar pasar a los que se hayan logueado
            if (user) next();
            else res.redirect('/login')
            break;
            case 'NO_AUTHENTICATED':
                if(!user) next();
                else res.redirect('/profile')
        }
    }
}

export const authRoles = (role) =>{
    return async(req,res,next) =>{
        if(req.user.role!=role) return res.status(403).send({status:"Error", error:"Sin autorizacion"})
        next();
    }
}