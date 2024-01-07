function random(min, max) {
    return Math.floor(Math.random() * (max - min +1) + min);
}

const ELEMENTOS = 100;

const randomArr = new Array(ELEMENTOS).fill(null).map(() => random(1, 20));
console.log(randomArr);

// Solución 1
// const result = {}
//     for (let i = 0; i < randomArr.length; i++) {
//         const element = randomArr[i];
//         result[element] = result[element] + 1 || 1
//     }

// console.log(result);

// Solución 2
const mappingRandom = randomArr.reduce((acc, value) => (acc[value] ? (acc[value] += 1) : (acc[value] =1), acc),
    {}
);
console.log(mappingRandom);