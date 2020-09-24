import HttpStatus from 'http-status-codes';
import bcrypt from 'bcryptjs';
import Usuarios from '../models/usuarios.model';
import DAO from '../models/_Dao';

export default {
    async Signin(req, res) {
        const schema = DAO.Usuarios();

        const { error, value } = schema.validate(req.body);

        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error.details[0]);
        }

        let verificar = await Usuarios.Verificar(value.email);


        if (verificar.status) {
            return res.status(HttpStatus.CONFLICT).json({
                type: 'conflit',
                message: 'El email ingresado ya existe'
            });
        }

        return bcrypt.hash(value.password, 10, async (err, hash) => {
            if (err) {
                return res.status(HttpStatus.BAD_REQUEST)
                    .json({
                        type: 'error',
                        message: 'Error encriptando la contraseña, intentelo nuevamente.'
                    });
            }

            let rs = await Usuarios.Registrar(value, hash);

            if (rs.affectedRows > 0) {
                return res.status(HttpStatus.CREATED)
                    .json({
                        type: 'success',
                        message: 'Usuario creado exitosamente.'
                    });
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({
                    type: 'error',
                    message: 'Ocurrio un error, intentelo nuevamente.'
                });

        });
    },
    async Listar(req, res) {
        let usuarios = await Usuarios.Listar();

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Listado de usuarios',
            data: usuarios
        })
    }
}