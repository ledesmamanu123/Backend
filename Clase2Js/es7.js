//nuevas funciones del JS. Exponencial ** y array.includes, review de map
let valoresBase = [1,2,3,4,5,6,7];
let nuevosValores =valoresBase.map((numero, indice)=> numero**indice)
 console.log(nuevosValores)


 //Array incluides (Funcion para filtrar un array)
 let nombres = ["Jua", "Maria", "Pedro", "Camilo"];

 if (nombres.includes("Juan")){
    console.log(`Juan si esta en el arrglo`);
 }else{
    console.log("Juan no esta en el arreglo");
 }
