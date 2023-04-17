import express from "express";

const app = express();

app.get('/papa', (request, response)=>{
    response.send('Hola express');
})

app.get('/bienvenida', (request,response)=>{
    response.send(`<h1 style= "color: blue">Hola Mundo Express</h1>`)
})

app.get('/user',(request,response)=>{
    const user = {
        nombre:"Pedro",
        edad:20,
        apellido:"Espinoza"
    }
    response.send(user)
})

app.get('/numbers',(request, response)=>{
    response.send('404')
})

app.get('/testrequest', (req, res)=>{
    console.log(req)
    res.send('ok')
})

app.get('/users/:name', (req, res)=>{
    console.log(req.params)
    const users = [
        {
            name:"juan",
            pet:"cat"
        },
        {
            name:"pepo", 
            pet:"dog"
        }
    ]
    const user = users.find((u)=>u.name===req.params.name)
    res.send(user)
})

app.get('/users2',(req,res)=>{
    console.log(req.query)
    const users = [
        {
            name:"juan",
            pet:"cat"
        },
        {
            name:"pepo", 
            pet:"dog"
        }
    ]
    //Con object.keys devolvemos un array con las propiedades
    //Con object.values devolvemos un array con los valores
    const search = Object.keys(req.query)[0]; 
    console.log(search);

    const user = users.find(u=>u[search] === req.query[search]) //Cualquiera sea la propiedad que me mandaste, tienen que ser igual a la de users (con object[] accedo a la propiedad)
    res.send(user)
})

app.listen(8080,()=>{console.log('ExpServer is listening in port 8080')})