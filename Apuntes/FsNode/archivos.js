const fs = require('fs');

const fecha = new Date().toLocaleDateString();
const hora = new Date().toLocaleTimeString();

console.log(fecha)
console.log(hora)

fs.writeFile('./desafios.txt', `fecha: ${fecha} y hora: ${hora}`, (error)=>{
    if (error){
        return console.log(error);
    }
    fs.readFile('./desafios.txt', 'utf-8', (error, content)=>{
        if (error){
            return console.log(error)
        }
        console.log(content);
    })
})
