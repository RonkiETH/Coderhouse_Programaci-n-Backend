const cars = [
    {
        brand: "Ferrari",
        price: "100",
        type: "Deportivo"
    },
    {
        brand: "Toyota",
        price: "70",
        type: "TodoTerreno"
    },
    {
        brand: "BMW",
        price: "93",
        type: "Deportivo"
    },
    {
        brand: "Nissan",
        price: "50",
        type: "Todoterreno"
    },
    {
        brand: "Ford",
        price: "5",
        type: "Todoterreno"
    },
];

const carsType = cars.map(car => car.type);
console.log(carsType);

const typeSearch = "Deportivo"
if (carsType.includes(typeSearch)) {
    console.log("Existen modelos deportivos");
} else {
    console.log("No existe el modelo buscado");
}

const carsPrices = cars.map((car) => car.price);
console.log(carsPrices);
console.log("Potencia: ", cars[3].price**2, carsPrices[3]**2,
cars[4].price**2, carsPrices[4]**2);

console.log("Usando Método Object.keys", Object.keys(cars), Object.keys(cars[0]));
console.log("Usando Método Object.values", Object.values(cars), Object.values(cars[1]));
console.log("Usando Método Object.entries", Object.entries(cars));

console.log("Usando Método Object.entries", Object.entries(cars[3]));

const carsIndexed = cars.reduce((acumulador, item, index) => {
    return {
        ...acumulador, // Spread Operator
        [index]: item
    }
}, {})

console.log(carsIndexed);
console.log(carsIndexed["4"]);