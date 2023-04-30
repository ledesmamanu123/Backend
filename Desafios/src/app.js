import express from 'express';
import handlebars from 'express-handlebars';
import { Server, Socket } from 'socket.io';

import viewsRouter from './routes/views.router.js'
import apiRouter from './routes/api.router.js'

import __dirname from './utils.js';


const app = express();
app.listen(8080,()=>{console.log('ExpServer is listening in port 8080')})

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(`${__dirname}/public`))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')


app.use('/', viewsRouter)
app.use('/api', apiRouter)
// const io = new Server(server);
