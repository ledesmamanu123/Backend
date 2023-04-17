import express from 'express';


const app = express();
app.use(express.json()); //Le declaramos que vamos a utilizar json como forma de conectarnos.


const pets = [];

app.get('/pets', (req, res)=>{
    res.send(pets)
})

app.post('/pets', (req, res)=>{
    const pet = req.body; //Solo usamos el body en post, put o delete (le mandamos todo el cuerpo en un objeto)
    pets.push(pet)
    res.send({status:"success", message:"mascota insertada"})
})

app.put('/pets/:pname', (req, res)=>{
    const name = req.params.pname;
    const pet = req.body; //Traemos el body completo para actualizar el pet
    const petIndex = pets.findIndex(pet => pet.name === name);
    if(petIndex === -1) return res.status(404).send({status:"error", message:"Pet not found"})
    pets[petIndex] = pet;
    res.send({status:"success", message:"mascota actualizada"})
})

app.delete('/pets/:pname', (req, res)=>{
    const name = req.params.pname;
    const petIndex = pets.findIndex(pet => pet.name === name);
    if(petIndex === -1) return res.status(404).send({status:"error", message:"La mascota no existe"})
    pets.splice(petIndex,1)
    res.send({status:"success", message:"Pet deleted"});
})

app.listen(8082,()=>{console.log('ExpServer is listening in port 8082')})