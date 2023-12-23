class TicketManager {
    #precioBaseDeGanancia = 0.20; // Atributo privado

    constructor() {
        this.eventos = [];
    }

    getEventos = () => {
        return this.eventos;
    }

    agregarEvento(nombre, lugar, precio, capacidad, fecha = new Date().toLocaleDateString()) {
        this.nombre = nombre;
        this.lugar = lugar;
        this.precio = precio;
        this.capacidad = capacidad || 50;
        this.fecha = fecha;
    }

    agregarUsuario(idEvento, idUsuario) {

    }

    ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha) {

    }
}

const evento1 = new TicketManager();

console.log(evento1);

evento1.agregarEvento("Coder Evento", "Buenos Aires", 100, 100, new Date("10-10-2002"));

console.log(evento1);

const evento2 = new TicketManager();

console.log(evento2);

evento2.agregarEvento("Coder Evento 2", "Buenos Aires", 100);

console.log(evento2);