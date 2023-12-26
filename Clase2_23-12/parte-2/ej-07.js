async function sumar(param1, param2) {
    return new Promise((resolve, reject) => {
        if (typeof param1 !== "number" || typeof param2 !== "number") {
            reject("El param1 o el param2 no son números")
        }

        resolve(param1 + param2)
    })
}

//TODO: Convertir esta función a promesa
async function restar(param1, param2) {
    return new Promise((resolve, reject) => {
        if (typeof param1 !== "number" || typeof param2 !== "number") {
            reject("El param1 o el param2 no son números")
        }

        resolve(param1 - param2)
    })
}

//TODO: Convertir esta función a promesa
async function multiplicar(param1, param2) {
    return new Promise((resolve, reject) => {
        if (typeof param1 !== "number" || typeof param2 !== "number") {
            reject("El param1 o el param2 no son números")
        }

        resolve(param1 * param2)
    })
}

//TODO: Convertir esta función a promesa
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
    } catch (error) {
        //TODO Todo lo que sea error o un reject
        console.log(error);
    } finally {
        console.log("FIN");
    }
}

// TODO: Llamar a los métodos de multiplicar, sumar y restar usando los métodos convertidos con promesas

dividir(20,10).then((resultado) => {
    console.log(resultado);
}).catch((error) => {
    console.log(error);
})

sumar(20,10).then((resultado) => {
    console.log(resultado);
}).catch((error) => {
    console.log(error);
})

restar(20,10).then((resultado) => {
    console.log(resultado);
}).catch((error) => {
    console.log(error);
})

multiplicar(20,10).then((resultado) => {
    console.log(resultado);
}).catch((error) => {
    console.log(error);
})


await dividir(20,2)


// dividir(12,0).then((resultado) => {
//     console.log(resultado);
// }).catch((error) => {
//     console.log(error);
// })

