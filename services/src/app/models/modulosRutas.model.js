import MySql from '../../config/database';

export default {
    async Listar(estado = 1) {
        let rs = await MySql.query(`CALL sp_modulos_rutas_listar(${estado})`);

        return rs[0];
    },
    async Registrar(ruta) {
        let rs = await MySql.query(`CALL sp_modulos_rutas_registrar
        ('${ruta.modulo_id}', '${ruta.nombre}', '${ruta.ruta}')`);
        
        return rs;
    }
}