import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

import viewsRouter from './routes/views.router.js';
import userRouter from './routes/users.router.js';
const app = express();

app.use(express.static(`${__dirname}/public`))

//Setear el motor de plantillas
app.engine('handlebars', handlebars.engine())

//Apuntamos a la carpeta donde van a estar mis vistas
app.set('views', `${__dirname}/views`)

//Setear el motor que va a estar aputando a las views (esto porque hay varios motores)
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)
app.use('/api/users', userRouter)


app.listen(8083, ()=> console.log("Listening in port 8083"))