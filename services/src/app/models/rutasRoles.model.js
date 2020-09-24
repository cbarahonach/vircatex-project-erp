import MySql from '../../config/database';

export default {
    async Listar(estado = 1) {
        let rs = await MySql.query(`CALL sp_rutas_roles_listar_roles_registrados(${estado})`);
        
        return rs[0];
    },
    async Registrar(body) {
        let rs = await MySql.query(`CALL sp_rutas_roles_registrar_roles_accesos(${body.rol}, ${body.ruta})`);
        
        return rs;
    }
}