import express from 'express';
import session from 'express-session';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';


// const fileStorage = FileStore(session)
const app = express();
const connection = mongoose.connect('mongodb+srv://ledesma_manu_:QsZvAD66IkiMkiHA@clusteronlytolearn.q6a1iy7.mongodb.net/DataSessions?retryWrites=true&w=majority')
app.use(session({
    //En store indicamos el camino donde se van a guardar las sessiones
    // store: new fileStorage({path: './src/sessions', ttl: 15, retries: 0}), //ttl : time to live, tiempo que va a durar la session, se mide en segundos
    store: new MongoStore({
        mongoUrl: "mongodb+srv://ledesma_manu_:QsZvAD66IkiMkiHA@clusteronlytolearn.q6a1iy7.mongodb.net/DataSessions?retryWrites=true&w=majority",
        ttl:10
    }),
    secret:'CodeS3cret',
    resave: false,
    saveUninitialized: false
}))

app.get('/', (req,res)=>{
    // req.session.papa = {gender: 'Male'}
    res.send('ok')
})
app.listen(8080, ()=> console.log('Listening'))