import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';

import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';

const app = express();

const connection = mongoose.connect('mongodb+srv://ledesma_manu_:QsZvAD66IkiMkiHA@clusteronlytolearn.q6a1iy7.mongodb.net/Clase17?retryWrites=true&w=majority')

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(`${__dirname}/public`))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)


app.listen(8080, ()=>console.log('Listening in 8080'))