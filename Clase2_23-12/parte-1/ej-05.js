const numeros = [1,2,3,4,5,6,7,8,9,190,19,10];

const numerosPares = numeros.filter(num => num % 2 === 0)
console.log(numerosPares);

const isOdd = (num => num % 2 === 0);

const numerosParesParametrosImplicitos = numeros.filter(isOdd)

// Este es un error
// const numerosParesParametrosExplicitos = numeros.filter(isOdd(num))

const numerosParesParametrosExplicitos2 = numeros.filter((num) => isOdd(num))

const newNumeros = numeros.map(x => x + 1);