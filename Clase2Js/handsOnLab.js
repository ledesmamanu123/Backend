class TicketManager {
    //esto es una variable privada, no puedes ingresar a la variable asi xq si, se declara con el #
    #precioBaseDeGanancia = 1.15;
    constructor(){
        this.eventos = [];

    }
    getEvento = () =>{
        return this.eventos;
    }
    agregarEvento = (nombre, lugar, precio, capacidad = 50, fecha = new Date().toLocaleDateString()) =>{
        const evento = {
            nombre,
            lugar,
            precio: precio * this.#precioBaseDeGanancia,
            capacidad,
            fecha,
            participantes: [],
        }
    }
}