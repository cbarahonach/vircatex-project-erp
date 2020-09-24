import MySql from '../../config/database';

export default {
    async Listar(estado = 1) {
        let rs = await MySql.query(`CALL sp_reportes_manufactura_listar(${estado})`);
        
        return rs[0];
    },
    async Registrar(reporte) {
        let rs = await MySql.query(`CALL sp_reportes_manufactura_registrar(
            '${reporte.cliente}', ${reporte.usuario_id}, '${JSON.stringify(reporte.data)}'
        )`);

        return rs;
    },
    async BuscarPorId(reporte) {
        let rs = await MySql.query(`CALL sp_reportes_manufactura_buscarPorId(${reporte.id})`);

        return rs[0][0];
    },
    async Actualizar(reporte) {
        let rs = await MySql.query(`CALL sp_reportes_manufactura_actualizar(
            ${reporte.id}, '${JSON.stringify(reporte.data)}'
        )`);

        return rs;
    },
    async Eliminar(id) {
        let rs = await MySql.query(`CALL sp_reportes_manufactura_eliminarPorId(${id})`);

        return rs;
    }
}