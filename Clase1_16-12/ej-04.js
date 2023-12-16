const mostrarLista = (lista) => {
    if(!(lista instanceof Array)) return console.error("No ingresaste un array como tipo de dato");

    if(lista && lista.length === 0) {
        return "Lista vacía"
    }

    for (let i = 0; i < lista.length; i++) {
        const lenguaje = lista[i];
        console.log((i + 1) + "- " + lenguaje);
    }

    return `La lista contiene ${lista.length} elementos`
}

const lenguajes = ["C", "JavaScript", "C++", "Python", "Java"]

console.log(mostrarLista(lenguajes));

const personas = 
    {
        name: "Juan",
        edad: 21,
        pelicula: "Señor de los Anillos",
        salario: 1000,
        fecha: new Date()
    };

console.log(Object.keys(personas));
console.log(Object.keys(personas).length);
console.log(Object.values(personas));
console.log(Object.entries(personas));