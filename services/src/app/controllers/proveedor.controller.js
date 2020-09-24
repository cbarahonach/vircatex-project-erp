import HttpStatus from 'http-status-codes';
import FormasPagos from '../models/formasPagos.model';
import Monedas from '../models/monedas.model';
import Bancos from '../models/bancos.model';
import Proveedores from '../models/proveedores.model';
import DAO from '../models/_Dao';

export default {
    async UtilidadesRegistrarProveedor(req, res) {
        let formasPagos = await FormasPagos.Listar();
        let monedas = await Monedas.Listar();
        let bancos = await Bancos.Listar();

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Listado de Personal.',
            data: { formas_pagos: formasPagos, monedas: monedas , bancos : bancos }
        });
    },
    async RegistrarProveedor(req, res) {
        const schema = DAO.Proveedor();
        const { error, value } = schema.validate(req.body);

        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error.details[0]);
        }

        console.log(value);
        
        let rs = await Proveedores.Registrar(value);

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Proveedor registrado satisfactoriamente.',
            data: rs
        })
    },

    async ActualizarProveedor(req, res) {
        const schema = DAO.Proveedor();
        const { error, value } = schema.validate(req.body);
            
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error.details[0]);
        }
        
        
        let rs = await Proveedores.Actualizar(value);

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Proveedor actualizado satisfactoriamente.',
            data: rs
        })
    },
    async ListarProveedores(req, res) {
        let rs = await Proveedores.Listar();

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Listado de proveedores',
            data: rs
        })
    },
    async EliminarProveedorId(req, res) {
        let id = req.body.proveedor_id;
        let rs = await Proveedores.Eliminar(id);
    
        return res.status(HttpStatus.OK).json({
          type: 'success',
          message: `Proveedor Eliminado con  ID: ${id}`,
          data: rs
        });
      },

      async ListarProveedorPorId(req, res) {
        console.log(req.body.proveedor_id);
        let id = req.body.proveedor_id;
        let rs = await Proveedores.ListarPorId(id);
    
        return res.status(HttpStatus.OK).json({
          type: 'success',
          message: `Proveedor Listado con  ID: ${id}`,
          data: rs
        });
      }
};
