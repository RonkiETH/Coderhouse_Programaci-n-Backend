const fs = require('fs/promises');

class UserManager {
    constructor(path) { 
        this.pathDB = path;
    }

    async createUser(user) {
        try {
            // const { nombre, apellido, nombreUsuario, contrasenia } = user

            const allUsers = await this.getUsers();

            const lastId = allUsers.length === 0 ? 1 : allUsers.usuarios[allUsers.usuarios.length - 1].id + 1;

            const newUser = { id: lastId, ...user}

            allUsers.usuarios.push(newUser);
            
            await fs.writeFile(this.pathDB, JSON.stringify(allUsers))

            return newUser
        } catch (error) {
            console.log(error);
        }
    }

    async getUsers() {
        try {
            const allUsers = await fs.readFile(this.pathDB)
            return JSON.parse(allUsers)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserManager;