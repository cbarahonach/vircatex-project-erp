import MySql from '../../config/database';

export default {
    async ListarDisponibles(id) {
        let rs = await MySql.query(`CALL sp_modulos_usuarioAccesos(${id})`);
        
        return rs[0];
    },
    async Listar(estado = 1) {
        let rs = await MySql.query(`CALL sp_modulos_listar(${estado})`);

        return rs[0];
    },
    async Registrar(modulo) {
        let rs = await MySql.query(`CALL sp_modulos_registrar('${modulo.nombre}', '${modulo.ruta}')`)
        
        return rs;
    }
}