//Cookies
import express from 'express';
import cookieParser, { signedCookie } from 'cookie-parser';

//Sessions
import session from 'express-session';

const app = express();

const PORT = 8080;

//Establecemos el middleware a nivel aplicacion (todas las rutas que sigan las podran usar)
app.use(cookieParser('SecretText:d'))

//Se establece como middleware
app.use(session({
    secret:'PalabraSecreta',
    resave:true, //Esto es mantener la seccion activa, si se deja en false, la session muere cuando haya inactividad
    saveUninitialized: true //Permite guardar cualquier session, aun cuando el objeto de session no tenga nada
}))

//Middleware de autenticacion
const auth = (req, res, next)=>{
    if (req.session?.user === 'pepe' && req.session?.admin){
        return next()
    } else{ return res.status(401).send({message:'Error de autenticacion'})}
}
//Si queremos utilizar solo una cookie a nivel ruta (o sea, solo una ruta tiene el poder usarla) la declaramos asi:
// app.get('/SetCookie', cookieParser(), (res,req)=>{

// })
app.get('/SetCookies', (req,res)=>{
    res.cookie('CoderCOOKIE', 'exceso de poder').send("Cookie")
})

app.get('/getCookie', (req,res)=>{
    //Con req.cookies accedemos a las cookies existentes. Con req.cookies.NombreDeLaCookie accedemos a una cookie en especifico
    res.send(req.cookies)
})

app.get('/deleteCookie', (req, res)=>{
    //Se utiliza clearCookie para eliminar una cookie, clearCookie('Nombre_de_la_cookie')
    res.clearCookie('CoderCOOKIE').send('cookie Deleteada')
})

//Para realizar una firma en la cookie, necesitamos un secret, que se agregar cuando inicializamos el middleware

app.get('/signedCookie', (req,res)=>{
    //Todas las cookies pueden ser alteradas, por es podemos firmar una cookie para q cuando la necesitemos, corroboremos que se igual a la q dejamos
    res.cookie('SecretCookie', 'exceso de poder pero secreto', {signed:true}).send('Cookie ultra secreta hecha')
})

app.get('/getSignedCookie', (req,res)=>{
    //Para traer las cookies firmadas se utiliza el metodo signedCookie
    res.json({cookies:req.cookies, signedCookie: req.signedCookies})
})


//SESSIONS
app.get('/session', (req,res)=>{
    if(req.session.counter){
        req.session.counter++;
        res.send({message:`Se ha visitado el sito ${req.session.counter}`});
    }else{
        req.session.counter = 1;
        res.send('Bienvenido')
    }
})

app.get('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if (!err) res.send('Logout ok');
        else res.send({message:'Error en logout', body:err})
    })
})

app.get('/login', (req,res)=>{
    const {user, pass} = req.query;
    if(user != 'pepe' || pass != '123') res.send('login falied')
    else {
        req.session.user = user;
        req.session.admin = pass;
        res.send('Login success')
    }
})

app.get('/loginPriv', auth, (req,res)=>{
    res.send('se logueo correctamente')
})
app.listen(PORT, () => console.log(`Server listening in ${PORT}`))