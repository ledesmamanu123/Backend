import passport, { Passport } from 'passport';
import local from 'passport-local';

import userModel from '../dao/mongo/models/user.js';
import { createHash, validatePassword } from '../src/utils.js';

const LocalStrategy = local.Strategy; //UNA ESTRATEGIA LOCAL SE BASA EN EL USERNAME + PASSWORD

const initializePassport = () =>{ //Creamos el metodo para inicializar cualquier tipo de estrategia

    //Passport va a tomar nuestras estrategias como si fuera una mas de su libreria.
                //('nombreDeLaEstrategia', La estrategia)
    passport.use('register', new LocalStrategy({passReqToCallback:true, usernameField}, async(req,email,password,done)=>{
        //passReqToCallback:true => si esta en false, significa que va a desechar todo lo que nos traiga req. Como nosotros no trabajamos con username, sino con email. vamos a dejarlo en true, asi podemos traer el email
        //usernameField: 'email' => significa que, yo se que estas esperando un username, asi que utiliza el 'email' que te llega del formulario como tu campo username.
        //Con esa configuracion, puedo cambiar la funcion y poner email en vez de username asi estaba antes(async(req,username,password,done))

        const {first_name, last_name} = req.body;

        const exists = await userModel.findOne({email});

        //done(error, user, {options})
        //error= no es problema que el usuario no exista, por eso lo dejamos en null
        //user= false porque no queremos devolver al usuario.
        //{options} = podemos agregar el message q va a devolver
        if(exists) return done(null,false,{message:'User already exist'})


        //Si el user no existe, encriptamos su pass
        const hashPass = await createHash(password);
        const user = {
            id:0,
            first_name,
            last_name,
            email,
            password:hashPass
        }
        const result = await userModel.create(user);
        
        //Si todo salio bien, Ahí es cuando done debe finalizar bien
        done(null,result)
    }))

    passport.use('login', {}, new LocalStrategy({usernameField:'email'}, async(email,password,done)=>{
        //Passport solo debe devolver al user, no es responsable de la sesion

        //Login de admin
        if(email === 'admin@admin.com'&& password ==='123'){
            //Inicializo el user del admin
            user = {
                name: 'Admin',
                email: '...',
                role:'admin' 
            }
        }
        let user;
        user = await userModel.findOne({email}); //Verificamos si el email existe
        if(!user) return done(null,false,{message:'Incorrect email'})
    
        const isValidPass = await validatePassword(password, user.password); //Verificamos la password
        if(!isValidPass) return done(null,false,{message:'Invalid password'})
    
        //Todo correcto,DEVOLVEMOS EL USER, para q session le cree su session
        user={
            id:user._id,
            name: `${first_name} ${last_name}`,
            email: user.email,
            role:user.role
        }
        done(null,user) //Devolvemos el user
    }))

    //Serealizacion de passport
    passport.serializeUser(function(user, done){
        return done(null,user.id);
    })
    passport.deserializeUser(async function(id, done){
        const user = await userModel.findOne({_id:id})
        return done(null,user);
    })

}

export default initializePassport;