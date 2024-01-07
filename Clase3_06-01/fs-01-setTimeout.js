const saludar = () => {
    console.log("Hola");
}

const comoEstas = (nombre) => {
    console.log(`¿Cómo estás ${nombre}?`);
}

const NOMBRE = "Fausto";

// Código Síncrono - Bloqueante
// saludar();
// comoEstas(NOMBRE);

// Código Asíncrono - No Bloqueante
const esperar = (timer, callback) => {
    setTimeout(() => {
        callback();
    }, timer);
}

comoEstas(NOMBRE);
esperar(3000, saludar);
esperar(2000, () => console.log("Callback versión arrow function"));
console.log("Fin de la ejecución");