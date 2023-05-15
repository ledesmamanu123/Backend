import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';

import viewsRouter from './routes/views.router.js'
import companiesRouter from './routes/companies.router.js'
import __dirname from './utils.js';

const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT, ()=>console.log(`Listening on ${PORT}`));
const connection = mongoose.connect('mongodb+srv://ledesma_manu_:QsZvAD66IkiMkiHA@clusteronlytolearn.q6a1iy7.mongodb.net/ERPSystem?retryWrites=true&w=majority')

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));

app.use('/', viewsRouter)
app.use('/api/companies', companiesRouter)