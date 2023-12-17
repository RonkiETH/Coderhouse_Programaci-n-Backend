class Persona {
    constructor(nombre, pais, edad) {
        this.nombre = nombre;
        this.pais = pais;
        this.edad = edad;
    }
    static especie = "Humana"

    saludo() {
        console.log(this.nombre);
        return "Hola, cómo estás?"
    }

    dondeVivo() {
        return `Vivo en ${this.pais} y tengo ${this.edadMetodo()} años`
    }

    dondeVivoV2() {
        return `Vivo en ${this.pais} y tengo ${this.edadMetodoV2()} años`
    }

    edadMetodo() {
        return this.edad;
    } 

    edadMetodoV2 = () => this.edad;
}

const persona1 = new Persona("Ronki", "ARG", "21");
console.log(persona1.nombre);
console.log(persona1.saludo());
console.log(persona1.dondeVivo());
console.log(persona1.dondeVivoV2());