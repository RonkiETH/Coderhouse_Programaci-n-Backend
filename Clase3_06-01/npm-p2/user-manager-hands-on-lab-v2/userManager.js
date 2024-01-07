const fs = require('fs/promises');
const bcrypt = require('bcryptjs')
const Joi = require('joi')

class UserManager {
    constructor(path) { 
        this.pathDB = path;
    }

    async createUser(user) {
        try {
            // Valido si la información del usuario es correcta
            const validation = await this.validateUser(user);
            const { error, value } = validation;
            console.log(value);
            console.log(error);

            if (err) return null

            const { nombre, apellido, nombreUsuario, contrasenia } = user

            const allUsers = await this.getUsers();

            const lastId = allUsers.length === 0 ? 1 : allUsers.usuarios[allUsers.usuarios.length - 1].id + 1;

            // Encriptacioón
            const salt = await bcrypt.genSalt();
            let contraseniaEncriptada = await bcrypt.hashSync(contrasenia, salt);
            const userToInsert = {
                nombre,
                apellido,
                nombreUsuario,
                contrasenia: contraseniaEncriptada
            }

            const newUser = { id: lastId, ...userToInsert}

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

    async validateUser(usuario) {
        try {
            // Mínimo 8 caracteres. al menos una letra y un número
            const schema = Joi.object({
                nombre: Joi.string().required(),
                apellido: Joi.string().required(),
                nombreUsuario: Joi.string().required(),
                contrasenia: Joi.string().min(6).alphanum().required()
            });

            return await schema.validateAsync(usuario)
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = UserManager;