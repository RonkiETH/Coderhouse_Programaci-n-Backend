// Scope Global
let i = 0;
console.log(i);
function miFuncion() {
    // Scope de la función
    i = 1;
    
    j = 2;

    if(true) {
        console.log(i);
        console.log(j);
    }

}

// console.log(j);

miFuncion();
console.log(i);

function scopeFunction() {
    // Scope de la función
    let i = 0;

    console.log(i);
    
    if(true) {
        // Scope del if
        let i = 1
        console.log(i);
    }
    i += 2;
    console.log(i);
}

scopeFunction();

function foo() {
    if(true) {
        let nombre = "rabin"
    }

    console.log(nombre);
}

foo();