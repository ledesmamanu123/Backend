//Creacion de un servidor con el protocolo http
import http from 'http';

const server = http.createServer((request, response)=>{
    response.end("Hola backend :d");
})

server.listen(8081,()=>{ //En esta arrow function vamos a indicar que querremos que haga el sv cuando empiece a escuchar
    console.log("Server open in port 8081")
})

//EADDRINUSE (error -4091) el port ya esta en unos
//Con ctrl + c, terminamos todos los procesos del sv