import express from 'express';
import session from 'express-session';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose'; 
import handlebars from 'express-handlebars';
import __dirname from './utils.js'
import initializePassport from './config/passport.config.js';


import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js'
import passport from 'passport';
import cookieParser from 'cookie-parser';
// const fileStorage = FileStore(session)
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser('SecretCookie'))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')



const connection = mongoose.connect('mongodb+srv://ledesma_manu_:QsZvAD66IkiMkiHA@clusteronlytolearn.q6a1iy7.mongodb.net/DataSessions?retryWrites=true&w=majority')


initializePassport(); //Inicializamos nuestras estrategias


app.use('/', viewsRouter)
app.use('/api/sessions', sessionsRouter)
app.listen(8080, ()=> console.log('Listening'))