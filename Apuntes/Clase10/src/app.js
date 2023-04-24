import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import viewRouter from './routes/views.router.js';
import __dirname from './utils.js';

const app = express();
app.use(express.static(`${__dirname}/public`))
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')
app.use('/', viewRouter)


const server = app.listen(8080,()=>console.log("Listening in port 8080"));

const io = new Server(server) //io va a estar en constante escucha de eventos (on y emit)

//ON es el escuchador de eventos (Acá es el handshake)
io.on('connection', socket =>{ //cuando ocurra un evento de 'connection' haz lo siguiente con ese socket
    console.log("nuevo cliente conectado")
})





