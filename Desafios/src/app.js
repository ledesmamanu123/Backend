import express from 'express';
import handlebars from 'express-handlebars';
import { Server, Socket } from 'socket.io';
import ProductManager from '../Managers/ProductManager/productManager.js';

import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js'
// import realTimeProdRouter from './routes/realtimeproducts.router.js'

import __dirname from './utils.js';

const app = express();
const server = app.listen(8080,()=>{console.log('ExpServer is listening in port 8080')})
const io = new Server(server);

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(`${__dirname}/public`))
app.use((req,res,next)=>{
    req.io = io;
    next();
})


app.use('/', viewsRouter)
app.use('/api/products', ProductsRouter);
app.use('/api/carts', CartsRouter);
// app.use('/api/realtimeproducts', realTimeProdRouter)

io.on('connection', socket=>{
    console.log(`New socket connected`);
})


