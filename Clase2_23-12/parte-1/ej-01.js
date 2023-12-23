const ferrari = {
    brand: "Ferrari",
    price: "100",
    type: "Deportivo"
}

const toyota = {
    brand: "Toyota",
    price: "70",
    type: "TodoTerreno"
}

const nissan = {
    brand: "Nissan",
    price: "50",
    type: "Todoterreno",
    color: "Black",
    tuning: true,
    transmition: "manual"
}

const cars = [ferrari, toyota, nissan];

const { brand, price, type, ...nissanValues } = nissan;
console.log(brand, price, type);
console.log(nissanValues);

const persona = {
    name: "Luis",
    age: 29
}

const { ...personValues } = persona;
console.log(personValues);

const carsSpread = [ {...ferrari}, {...toyota}, {...nissan} ]
console.log(carsSpread);

const team = {
    name: "Real Madrid",
    year: 1900
}

console.log(team);

const team2 = { ...team };
team2.name = "Milan"

console.log(team2);

const team3 = team;

console.log(team3);
team3.year = 2000;

console.log(team);