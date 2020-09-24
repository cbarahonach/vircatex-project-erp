import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuarios from '../models/usuarios.model';
import Configuracion from '../models/configuracion.model';

export default {
    async Signin(req, res) {
        const schema = Joi.object().keys({
            rol_id: Joi.number()
                .integer()
                .min(1)
                .max(10)
                .required(),
            nombre: Joi.string()
                .min(5)
                .max(100)
                .required(),
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .min(5)
                .required()
        });

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
    async Login(req, res) {
        const schema = Joi.object().keys({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .min(5)
                .required(),
        });

        const { error, value } = schema.validate(req.body);

        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error.details[0]);
        }

        let verificar = await Usuarios.Verificar(value.email);

        if (!verificar.status) {
            return res
                .status(HttpStatus.CONFLICT)
                .json({
                    type: 'conflit',
                    message: 'El email ingresado no existe.'
                });
        }

        let usuario = verificar.data;

        return bcrypt.compare(value.password, usuario.password).then(result => {
            if (!result) {
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ type: 'error', message: 'Contraseña incorrecta, intentelo nuevamente.' });
            }

            delete usuario.password;

            const token = jwt.sign({ payload: usuario }, process.env.JWT_TOKEN, {
                expiresIn: '12h'
            });

            res.cookie('auth', token);

            return res
                .status(HttpStatus.OK)
                .json({
                    type: 'success',
                    message: 'Verificación exitosa.',
                    token
                });
        });
    },
    async Me(req, res) {
        return res.status(HttpStatus.OK).json(req.jwt);
    },
    async ChangePassword(req, res) {
        let verificar = await Usuarios.Verificar(req.body.email);
        let usuario = verificar.data
        let compare = bcrypt.compareSync(req.body.password, usuario.password);

        if (req.body.password == req.body.new_password) {
            return res.status(HttpStatus.BAD_REQUEST)
                .json({
                    type: 'error',
                    message: 'Error, la nueva contraseña debe ser diferente a la actual.'
                })
        }

        if (compare) {
            return bcrypt.hash(req.body.new_password, 10, async (err, hash) => {
                if (err) {
                    return res.status(HttpStatus.BAD_REQUEST)
                        .json({
                            type: 'error',
                            message: 'Error encriptando la contraseña, intentelo nuevamente.'
                        });
                }

                req.body.new_password = hash;

                let rs = await Usuarios.CambiarPassword(req.body);

                if (rs.affectedRows > 0) {
                    return res.status(HttpStatus.OK).json({
                        type: 'success',
                        message: 'Contraseña actualizada satisfactoriamente.',
                        data: rs
                    });
                }

                return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({
                        type: 'error',
                        message: 'Ocurrio un error, intentelo nuevamente.'
                    });

            });
        }
        return res.status(HttpStatus.OK).json({
            type: 'error',
            message: 'La contraseña actual ingresada es incorrecta.',
            data: req.body
        });
    },
    async DetallesSistema(req, res) {
        let rs = await Configuracion.Ver();

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Detalles del sistema',
            data: rs
        })
    }
}