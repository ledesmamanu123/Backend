const objetos =  [
	{
		manzanas:3,
		peras:2,
		carne:1,
		jugos:5,
		dulces:2
	},
	{
		manzanas:1,
		sandias:1,
		huevos:6,
		jugos:1,
		panes:4
	}
]

let nuevoArray = [];

//recorremos el array objetos.
objetos.forEach(objeto=>{
    const keys = Object.keys(objeto);
    keys.forEach(key=>{
        // el ! significa negación
        // solo si no existe la key en el arreglo, entonces pushealo.
        if(!nuevoArray.includes(key)) nuevoArray.push(key);
    })
})

console.log(nuevoArray)