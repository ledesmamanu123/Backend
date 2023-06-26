import express from 'express';
import DictionaryRouter from './routes/dictionary.router.js';
import PetsRouter from './routes/pets.router.js';
import UserRouter from './routes/user.router.js';
import SessionRouter from './routes/sessions.router.js';
const app = express()

//Instanciamos el router
const sessionRouter = new SessionRouter();
const userRouter = new UserRouter();

app.listen(8080, ()=> console.log('Listening in port 8080'))
app.use('/api/dictionary', DictionaryRouter)
app.use('/api/pets', PetsRouter)
app.use('/api/users', userRouter.getRouter())
app.use('/api/sessions',sessionRouter.getRouter())