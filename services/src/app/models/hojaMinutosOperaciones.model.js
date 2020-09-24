import MySql from '../../config/database';

export default {
    async Listar(id, estado = 1) {
        let rs = await MySql.query(`CALL sp_hoja_minutos_operaciones_listar_by_id(
            ${id}, ${estado}
        )`);

        return rs[0];
    },
    async Registrar(operacion) {
        let rs = await MySql.query(`CALL sp_hoja_minutos_operaciones_registrar(
            '${operacion.bloque}','${operacion.operacion}',${operacion.id_maquina},
            '${operacion.ts}','${operacion.cat}',${operacion.id_hoja_minutos}
            )`);

        return rs;
    },
    async Eliminar(operacion) {
        let rs = await MySql.query(`CALL sp_hoja_minutos_operaciones_eliminar(${operacion.id_hoja_minutos})`);

        return rs;
    }

}