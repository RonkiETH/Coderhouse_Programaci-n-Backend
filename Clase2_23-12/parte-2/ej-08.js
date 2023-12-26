const sumar = async (param1, param2) => {
    return new Promise((resolve, reject) => {
        if (param1 === 0 || param2 === 0) {
            reject('Operación innecesaria: Ninguno de los valores puede ser 0');
        }

        if (typeof param1 !== "number" || typeof param2 !== "number") {
            reject('Alguno de los dos valores ingresados no es un número');
        }
        
        resolve(param1 + param2)
    })
}

//TODO Resta
const restar = async (param1, param2) => {
    return new Promise((resolve, reject) => {
        if (param1 === 0 || param2 === 0) {
            reject('Operación innecesaria: Ninguno de los valores puede ser 0');
        }

        if (typeof param1 !== "number" || typeof param2 !== "number") {
            reject('Alguno de los dos valores ingresados no es un número');
        }
        
        resolve(param1 - param2)
    })
}

//TODO Multiplicación
const multiplicar = async (param1, param2) => {
    return new Promise((resolve, reject) => {
        if (param1 === 0 || param2 === 0) {
            reject('Operación innecesaria: Ninguno de los valores puede ser 0');
        }

        if (typeof param1 !== "number" || typeof param2 !== "number") {
            reject('Alguno de los dos valores ingresados no es un número');
        }
        
        resolve(param1 * param2)
    })
}

async function dividir(dividendo, divisor) {
    return new Promise((resolve, reject) => {
        if (typeof dividendo !== "number" || typeof divisor !== "number") {
            reject("El dividendo o el divisor no son números")
        }

        if (divisor == 0) { 
            reject('Error: No se puede dividir entre cero');
        } 
        resolve(dividendo / divisor)
    })
}

const callAsyncFunction = async () => {
    try {
        let result = await dividir(20, 2)
        console.log(result);

        let resultSum = await sumar(100, 200);
        console.log(resultSum);

        let resultRes = await restar(100,50);
        console.log(resultRes);

        let resultDiv = await dividir(100,50);
        console.log(resultDiv);

    } catch (error) {
        //TODO Todo lo que sea error o un reject
        console.log(error);
    } finally {
        console.log("FIN");
    }
}

callAsyncFunction();