class Contador {
    static contadorInstances = 0;
    constructor(nombre) {
        this.nombre = nombre;
        this.valor = 0;
        Contador.contadorInstances += 1;
    }

    getContador = () => {
        return this.valor;
    }

    setContador(valor) {
        this.valor = valor;
    }

    getResponsable() {
        return this.nombre;
    }

    getCuentaIndividual() {
        return this.valor;
    }

    getCuentaGlobal = () => {
        return Contador.contadorInstances;
    }
}

console.log("ATRIBUTO ESTÁTICO", Contador.contadorInstances);

const primerContador = new Contador("Ronki");

console.log(`El contador de ${primerContador.getResponsable()} tiene un valor de ${primerContador.getContador()}`);

primerContador.setContador(10);

console.log("ATRIBUTO ESTÁTICO", Contador.contadorInstances, primerContador.getContador());

const contador2 = new Contador("Juan");

console.log("ATRIBUTO ESTÁTICO", Contador.contadorInstances, contador2.setContador(200), contador2.getContador());

const contador3 = new Contador("Tomas");

const contador4 = new Contador("Marcos");

console.log(
    "Número de instancias de contador", Contador.contadorInstances, 
    contador4.getCuentaGlobal()); 
