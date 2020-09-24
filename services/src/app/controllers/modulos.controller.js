import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';
import Modulos from '../models/modulos.model';
import Rutas from '../models/modulosRutas.model';
import DAO from '../models/_Dao';

export default {
    async HabilitarModulos(req, res) {
        req.body.id = req.jwt.payload.id;
        
        const schema = Joi.object().keys({
            id: Joi.number()
                .required()
        });

        const { error, value } = schema.validate(req.body);

        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error.details[0]);
        }

        let modulos = await Modulos.ListarDisponibles(value.id);

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Listado de modulos disponibles',
            data: modulos
        });
    },
    async Listar(req, res) {
        let rs = await Modulos.Listar();

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Listado de modulos.',
            data: rs
        })
    },
    async Registrar(req, res) {
        const schema = DAO.Modulos();

        const { error, value } = schema.validate(req.body);

        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error.details[0]);
        }

        let rs = await Modulos.Registrar(value);

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Registro de modulo exitoso.',
            data: rs
        })
    },
    async ListarRutas(req, res) {
        let rs = await Rutas.Listar();

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Listado de rutas de modulos.',
            data: rs
        })
    },
    async RegistrarRutas(req, res) {
        const schema = DAO.ModulosRutas();

        const { error, value } = schema.validate(req.body);

        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error.details[0]);
        }

        let rs = await Rutas.Registrar(value);
        
        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Ruta de modulo registrado exitosamente.',
            data: rs
        });
    },
    
}