import express from 'express';
import usersRouter from '../routes/users.router.js';
import mongoose from 'mongoose';

const app = express();

//Conectamos con mongo
const connection = mongoose.connect('mongodb+srv://ledesma_manu_:QsZvAD66IkiMkiHA@clusteronlytolearn.q6a1iy7.mongodb.net/?retryWrites=true&w=majority')

app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.use('/api/users', usersRouter);

app.listen(8080,()=>console.log("Listening"))