const sumar = (param1, param2) => param1 + param2

const restar = (param1, param2) => {
    return param1 - param2
} 

function multiplicar(param1, param2) {
    return param1 * param2;
}

function dividir(param1, param2) {
    return param1 / param2;
}

const aplicarOperacion = (param1, param2, callback) => {
    console.log(`Aplicacando la operación`);
    let operacionRes = callback(param1, param2);

    console.log(operacionRes);
}

aplicarOperacion(10, 20, sumar);
aplicarOperacion(10, 20, (param1, param2) => param1 + param2);

aplicarOperacion(20, 1, restar);
aplicarOperacion(5, 5, multiplicar);
aplicarOperacion(10, 2, dividir);

