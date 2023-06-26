import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

import SessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js'
import companiesRouter from './routes/companies.router.js'
import __dirname from './utils.js';
import initializePassportStrategies from './config/passport.config.js';


//Instancio mis clases
const sessionsRouter = new SessionsRouter();


const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT, ()=>console.log(`Listening on ${PORT}`));
const io = new Server(server)
const connection = mongoose.connect('mongodb+srv://ledesma_manu_:QsZvAD66IkiMkiHA@clusteronlytolearn.q6a1iy7.mongodb.net/ecommerce?retryWrites=true&w=majority')
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));

initializePassportStrategies();
app.use('/', viewsRouter)
app.use('/api/companies', companiesRouter)
app.use('/api/sessions', sessionsRouter.getRouter())

io.on('connection', socket=>{
    
})