import MySql from '../../config/database';

export default {
    async Registrar(reporte) {
        let rs = await MySql.query(`CALL sp_reportes_textil_registrar(
            '${reporte.fabrica}','${reporte.cliente}','${reporte.fecha_creacion_po}','${reporte.po_buy}','${reporte.estilo}',
            '${reporte.op}','${reporte.tintoreria}','${reporte.oc_tela}','${reporte.fecha_oc_tela}','${reporte.articulo}',
            '${reporte.tela_principal_complemento}','${reporte.color}','${reporte.kg_prog}','${reporte.partida}','${reporte.fecha_hilado}',
            '${reporte.fecha_tejido}','${reporte.fecha_tenhido}','${reporte.fecha_ta_planta}','${reporte.fecha_programada_auditoria}','${reporte.fecha_reprogramada_auditoria}',
            '${reporte.fecha_despacho_real}','${reporte.kilos_despacho}','${reporte.dias_atraso}','${reporte.comentarios}','${reporte.situacion_actual}',
            '${reporte.tipo_req}'
        )`);

        return rs;
    },
    async Listar(estado = 1) {
        let rs = await MySql.query(`CALL sp_reportes_textil_listar(${estado})`);

        return rs[0];
    },
    async Actualizar(reporte) {
        let rs = await MySql.query(`CALL sp_reportes_textil_actualizar(
            ${reporte.id}, '${reporte.fabrica}','${reporte.cliente}','${reporte.fecha_creacion_po}',
            '${reporte.po_buy}','${reporte.estilo}','${reporte.op}','${reporte.tintoreria}',
            '${reporte.oc_tela}','${reporte.fecha_oc_tela}','${reporte.articulo}','${reporte.tela_principal_complemento}',
            '${reporte.color}','${reporte.kg_prog}','${reporte.partida}','${reporte.fecha_hilado}',
            '${reporte.fecha_tejido}','${reporte.fecha_tenhido}','${reporte.fecha_ta_planta}',
            '${reporte.fecha_programada_auditoria}', '${reporte.fecha_reprogramada_auditoria}',
            '${reporte.fecha_despacho_real}','${reporte.kilos_despacho}','${reporte.dias_atraso}', 
            '${reporte.comentarios}','${reporte.situacion_actual}','${reporte.tipo_req}'
        )`);

        return rs;
    },
    async Eliminar(id) {
        let rs = await MySql.query(`CALL sp_reportes_textil_eliminar(${id})`);

        return rs;
    }
}