const path = require('path');
const UserManager = require("./userManager");

const projectUsers = async () => {
    console.log('Iniciando el User Manager');

    try {
        const pathBase = path.join(`${__dirname}/db.json`);
        const userManager = new UserManager(pathBase);

        let users = await userManager.getUsers();
        console.log(users);

        const newUser = {
            nombre: "Luis",
            apellido: "Luis",
            nombreUsuario: "RM",
            contrasenia: "Luigi1"
        }

        const addUser = await userManager.createUser(newUser);

        if (!addUser) {
            console.log("No se pudo crear el usuario");
        }

        console.log(addUser);

        users = await userManager.getUsers();
        console.log(users);

    } catch (error) {
        console.log(error);
    }
}

projectUsers();