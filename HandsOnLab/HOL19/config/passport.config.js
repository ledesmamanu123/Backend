import passport, { Passport } from 'passport';
import local from 'passport-local';
import GithubStrategy from 'passport-github2';

import userModel from '../dao/mongo/models/user.js';
import { createHash, validatePassword } from '../src/utils.js';

const LocalStrategy = local.Strategy; //UNA ESTRATEGIA LOCAL SE BASA EN EL USERNAME + PASSWORD

const initializePassport = () =>{ //Creamos el metodo para inicializar cualquier tipo de estrategia

    //Passport va a tomar nuestras estrategias como si fuera una mas de su libreria.
                //('nombreDeLaEstrategia', La estrategia)
    passport.use('register', new LocalStrategy({passReqToCallback:true, usernameField:'email'}, async(req,email,password,done)=>{
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

    passport.use('login',new LocalStrategy({usernameField:'email'}, async(email,password,done)=>{
        //Passport solo debe devolver al user, no es responsable de la sesion
        console.log("passport Login: email: "+email+" y pass: "+password)
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
        console.log("el email existe?")
        if(!user) return done(null,false,{messages:'Incorrect email'})
        console.log("si existe el mail")
        const isValidPass = await validatePassword(password, user.password); //Verificamos la password
        console.log("la password es correcta?")
        if(!isValidPass) return done(null,false,{messages:'Invalid password'})
        console.log("La password si es correcta")
    
        //Todo correcto,DEVOLVEMOS EL USER, para q session le cree su session
        user={
            id:user._id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role:user.role
        }
        done(null,user) //Devolvemos el user
    }))


    passport.use('github', new GithubStrategy({
        clientID:"Iv1.331c34c2f88ece0c",
        clientSecret:"8b4dd949f8c49cf43fb5b356cd01ff2084d16461",
        callbackURL:"http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done)=>{
        try {
            console.log(profile)
            //Tomo los datos q me sirvan
            const {name, email} = profile._json;
            const user = await userModel.findOne({email})

            if(!user){
                //No existe, lo creo
                const newUser = {
                    first_name: name,
                    email: email,
                    password:''
                }
                const result = await userModel.create(newUser)
                done(null,result)
            }
            //Si existe, entonces lo devuelvo
            done(null,user)
        } catch (error) {
            done(error)
        }
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