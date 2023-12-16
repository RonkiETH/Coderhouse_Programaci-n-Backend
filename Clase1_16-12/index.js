console.log("Inicio curso Coderhouse");

console.warn("Advertencia");

console.info("Info");

console.error("ERROR");

var personas = [
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

console.table(personas)
console.table(personas[2]);

console.log("File: index.js - personas", personas[2].name);
// console.table("File: index.js - personas", personas[2].name);