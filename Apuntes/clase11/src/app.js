import express from 'express';
import handlebars from 'express-handlebars';
import { Server, Socket } from 'socket.io';

import viewRouter from './routes/views.router.js';
import __dirname from './utils.js';

const app = express();
const server = app.listen(8080,()=>console.log("Listening in port 8080"));

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(`${__dirname}/public`))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/', viewRouter)

const io = new Server(server);

const messages = [];
io.on('connection', socket=>{
    console.log("New socket connected");

    //Le mandamos la data que tenemos en "message", al evt "logs"
    socket.emit('logs',messages)
    //Se pone a escuchar el evt "message"
    socket.on('message', data=>{

        //Con la data que nos llega de "message", hacemos lo siguiente...
        console.log(data)
        messages.push(data);

        //Le manda la data a el evt "logs"
        io.emit('logs',messages) //Con io notificamos a todos, con socket solo para mi
    })
    socket.on('authenticated', data=>{
        socket.broadcast.emit('newUserConnected',data) //Notificamos a todos menos a mi
    })

})


