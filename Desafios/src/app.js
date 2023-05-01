import express from 'express';
import handlebars from 'express-handlebars';
import { Server, Socket } from 'socket.io';

import viewsRouter from './routes/views.router.js'
import realTimeProdRouter from './routes/realtimeproducts.router.js'
import homeRouter from './routes/home.router.js'

import __dirname from './utils.js';


const app = express();
const server = app.listen(8080,()=>{console.log('ExpServer is listening in port 8080')})

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(`${__dirname}/public`))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')


app.use('/', viewsRouter)
app.use('/api/realtimeproducts', realTimeProdRouter)
app.use('/home', homeRouter)
app.use((req,res,next)=>{
    req.io = io;
    next();
})
const io = new Server(server);

io.on('connection',socket=>{
    console.log(`New socket connected`);
})
