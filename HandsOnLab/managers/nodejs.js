
const objNumero = {};

for (let i = 0; i < 10000; i++) {
    function random(min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }
    let num = random(1,20);
    if(!objNumero[num]) objNumero[num] = 1;  //Si no existe el nro, crealo como propiedad e igualalo a 1
    else objNumero[num]++; //Si ya existe, sumale 1
}
console.log(objNumero)
