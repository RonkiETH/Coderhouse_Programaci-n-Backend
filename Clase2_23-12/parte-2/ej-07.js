
//TODO: Convertir esta función a promesa
const sumar = (param1, param2) => param1 + param2

//TODO: Convertir esta función a promesa
const restar = (param1, param2) => {
    return param1 - param2
} 

//TODO: Convertir esta función a promesa
function multiplicar(param1, param2) {
    return param1 * param2;
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

dividir(12,0).then((resultado) => {
    console.log(resultado);
}).catch((error) => {
    console.log(error);
})

