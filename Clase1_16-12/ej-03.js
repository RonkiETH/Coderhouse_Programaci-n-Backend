function hola() {
    console.log("hola hola");
    return "hola"

    let edad = 1;
    edad += 2;
};

const saludar = hola();
console.log(saludar);

function saludo(nombre) {
    return "Hola " + nombre + ", cómo estás?";
}

const saludoLuis = saludo("Luis");
console.log(saludoLuis);

const saludoV2 = (nombre) => {
    return "Hola " + nombre + ", cómo estás?"
}

const saludoLuisV2 = saludoV2("Nacho");
console.log(saludoLuisV2);

const saludoV3 = (nombre) => "Hola " + nombre + ", cómo estás?"

const saludoLuisV3 = saludoV3("Matias");
console.log(saludoLuisV3);

const persona = () => ({ nombre: "Juan", edad: 21 });

const nuevaPersona = persona();
console.log(nuevaPersona);

const personaV2 = () => {
    return { nombre: "Michael", edad: 21 }
};

const nuevaPersonaV2 = personaV2();
console.log(nuevaPersonaV2);

