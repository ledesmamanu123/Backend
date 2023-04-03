//Objetos
let objeto = {
    nombre: "Carlos",
    apellido:"Pelayes",
    edad: 26
}
console.log(Object.keys(objeto)) //Genera un arreglo de strings con el nombre de las keys

//['nombre', 'apellido', 'edad']

console.log(Object.values(objeto)) //Lo mismo pero trae las values

//['Carlos', 'Pelayes', 26]

console.log(Object.entries(objeto)) //Me trae los dos, keys y values, crea un array de arrays
// [ [ 'nombre', 'Carlos' ], [ 'apellido', 'Pelayes' ], [ 'edad', 26 ] ]