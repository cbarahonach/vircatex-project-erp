import MySql from '../../config/database';

export default {
    async Listar(id, estado = 1) {
        let rs = await MySql.query(`CALL sp_hoja_minutos_listar_by_id(${estado}, ${id})`);
        
        return rs[0][0] == undefined ? {} : rs[0][0];
    },
    async Registrar(hm) {
        let rs = await MySql.query(`CALL sp_hoja_minutos_registrar(
            '${hm.analista}','${hm.fecha}','${hm.po}',
            '${hm.tipo_prenda}','${hm.tela_cuerpo_1}','${hm.tela_cuerpo_2}','${hm.artes}',
            '${hm.acabados}','${hm.tallas}','${hm.jornada}','${hm.operarios}','${hm.eficiencia}',
            '${hm.quiero_sacar}','${hm.si_tengo}','${hm.tpo_corte}','${hm.tpo_acabados}',
            ${hm.cotizacion_id}, @output
        ); 
        SELECT @output as 'id_hoja_minutos';`);

        return rs[1][0];
    }

}