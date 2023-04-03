//Spread y Rest operator
const objetoA = {
    pera: 1,
    manzana: 1,
    banana: 2,
    fresas:3
};
const objetoB = {
    duraznos: 2,
    uva: 4,
    ciruela:6,
    fresas:5
};



//Spread, lo usamos para vaciar el objeto/array.
const objetoC = {
    ...objetoA,
    ...objetoB
}

//Si tenemos 2 mismas keys, deja el valor de la ultima por la q pasa
console.log(objetoC)
/*{
    pera: 1,
    manzana: 1,
    banana: 2,
    fresas: 5,
    duraznos: 2,
    uva: 4,
    ciruela: 6
}*/


//Desesctructuracion
// const peras = objetoA.pera;
// const manzana = objetoA.manzana;
// const durazno = objetoB["duraznos"];


//De forma más común es la siguiente

//frutasRestantes es una variable nueva que creo para que, todo lo que no anote, me lo guarde en un objeto.

const {pera, manzana, ...frutasRestantes} = objetoA; //Traemos solo las keys que vamos a utilizar 


console.log(frutasRestantes) //Puedo guardar las keys que no saque del objeto.

//Rest operator
console.log(frutasRestantes.banana)