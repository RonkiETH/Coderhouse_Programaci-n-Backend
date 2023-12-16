const PI = 3.1416;

// PI += 1;

function foo() {
    if(true) {
        const nombre = "Juan Ignacio"
        // nombre += " Ronquillo"
        console.log(nombre);
    }

    // console.log(nombre);
}

foo();

const numeros = [1,2,3,4];
console.log(numeros);

numeros[3] = 100;
console.log(numeros);

const personas = [
    {
        name: "Juan",
        edad: 21,
        pelicula: "Señor de los Anillos",
        salario: 1000,
        fecha: new Date()
    },
    { name: "Nico", edad: 23, pelicula: "Harry Potter", salario: 100 },
    { name: "Lucas", edad: 25, pelicula: "Harry Potter 3", salario: 150 },
    { name: "Luis", edad: 30, pelicula: "Indiana Jones", salario: 4500 },
    ];

personas[1].name = "Jorgito";
    
console.log(personas[1]);