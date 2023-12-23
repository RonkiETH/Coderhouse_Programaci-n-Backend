const canasta = [
    {
        manzanas: 2,
        peras: 4,
        carnes: 2,
        dulces: 10
    },
    {
        manzanas: 8,
        peras: 2,
        carnes: 11,
        dulces: 2
    },
    {
        manzanas: 1,
        peras: 2,
        carnes: 11,
        dulces: 2
    }
]

console.log("Cantidad de manzanas", canasta[0].manzanas + canasta[1].manzanas);

const canastaManzanas = canasta.map(canasta => canasta.manzanas)

console.log(canastaManzanas);
console.log(Object.values(canasta));

// Ejemplo
const contarManzanas = canasta.reduce((acc, item) => {
    return (acc += item.manzanas);
}, 0)

console.log(contarManzanas);

const cantidadDeManzanas = canasta.map(fruta => fruta.manzanas);
console.log(cantidadDeManzanas);

const soloManzanas = canasta.map( (lista) => Object.values(lista)[0] )
//console.log(soloManzanas);

sumaManzanas = 0;
soloManzanas.forEach((element) => {
  //console.log(element);
  sumaManzanas+=element;
});
console.log(sumaManzanas)

// Tarea 1:  Lograr un array con las cantidades de manzanas
// Tarea 2: Sumar las cantidades totales de manzanas