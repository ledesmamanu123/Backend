//Hands on Lab: Realizar un contador
class Contador {
    constructor(responsable){
        this.responsable = responsable;
        this.conteo = 0;
    }
    static conteoGlobal = 0;
    getResponsable = ()=>{
        return this.responsable; //Devolvemos al responsable
    }
    getCuentaIndividual = ()=>{
        return this.conteo; //el this me devuelve lo mio
    }
    getCuentaGlobal = () =>{
        return Contador.conteoGlobal; //el Contador me devuelve el global
    }
    contar = () =>{
        this.conteo++;
        Contador.conteoGlobal++; //Para acceder a las variables globales, no se puede utilizar el this
    }

}

const contador1 = new Contador("Agus")
const contador2 = new Contador("Martin")
const contador3 = new Contador("Sofi")

contador1.contar();
console.log(contador1.getCuentaIndividual())