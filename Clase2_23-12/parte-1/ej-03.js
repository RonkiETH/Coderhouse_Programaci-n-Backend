const message = "   Hola, cómo estas      "
console.log(message.trim());
console.log(message.trim() === message);
console.log(message.trim().length);
console.log(message.length);

let arrayCombinado = [123,51,2,5,6, 
    [2,7,8,31,0,2], 
    [
        [25, 1], [-1, 4]
    ]
];

console.log(arrayCombinado);

console.log(arrayCombinado.flat());