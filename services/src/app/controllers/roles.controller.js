import HttpStatus from 'http-status-codes'; 
import RutasRoles from '../models/rutasRoles.model';
import Roles from '../models/roles.model';

export default {
    async Listar(req, res) {
        let roles = await Roles.Listar();

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Listado de roles disponibles',
            data: roles
        });
    },
    async ListarRolesRegistrados(req, res) {
        let rs = await RutasRoles.Listar();

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Listado de roles registrados',
            data: rs
        });
    },
    async RegistrarRolRuta(req, res) {
        const body = { rol: req.body.rol, ruta: req.body.ruta };
        
        let rs = await RutasRoles.Registrar(body);

        if(!!rs.affectedRows && rs.affectedRows <= 0) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                type: 'error',
                message: 'Ocurrio un error con el servidor, contacte con el administrador para mas información'
            })
        }
        
        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Se registraron los accesos al rol satisfactoriamente.'
        })
    }
}