import express from 'express';
import handlebars from 'express-handlebars';
import { Server, Socket } from 'socket.io';
import usersRouter from './routes/users.router.js'
import petsRouter from './routes/pets.router.js'
import viewsRouter from './routes/views.router.js'

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
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);

const io = new Server(server);
