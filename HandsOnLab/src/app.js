import express from 'express';
import usersRouter from './routes/users.router.js'
import petsRouter from './routes/pets.router.js'

import __dirname from './utils.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true})) //Objetos codificados desde URL
app.use(express.static(`${__dirname}/public`)) //Con esta linea, podemos acceder siempre a imagenes, etc.


app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);





app.listen(8082,()=>{console.log('ExpServer is listening in port 8082')})