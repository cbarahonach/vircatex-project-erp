import MySql from '../../config/database';

export default {
    async Listar(estado = 1) {
        let rs = await MySql.query(`CALL sp_cotizaciones_listar(${estado})`);

        return rs[0];
    },
    async Registrar(cotizacion) {
        let rs = await MySql.query(`CALL sp_cotizaciones_registrar(
            ${cotizacion.cliente_id}, ${cotizacion.usuario_id}, ${cotizacion.temporada_id},
            '${cotizacion.estilo}', '${cotizacion.tipo_tela}', '${cotizacion.composicion_tela}',
            '${cotizacion.complemento1}', '${cotizacion.complemento2}', '${cotizacion.complemento3}',
            '${cotizacion.complemento4}', '${cotizacion.tp_archivo}', '${cotizacion.hm_archivo}',
            @last_id
            ); SELECT @last_id;`);

        return rs[1][0];
    },
    async RegistrarItem(item, cotizacion_id) {
        let rs = await MySql.query(`CALL sp_cotizaciones_curvas_registrar(
            ${cotizacion_id}, ${item.talla_id}, ${item.cantidad}
        )`);

        return rs;
    },
    async BuscarPorId(cotizacion) {
        let rs = await MySql.query(`CALL sp_cotizaciones_buscarPorId(${cotizacion.id})`);

        return rs[0][0];
    },
    async BuscarTextilPorId(cotizacion, estado = 1) {
        let rs = await MySql.query(`CALL sp_cotizaciones_textil_buscarPorId(${cotizacion.id}, ${estado})`);

        return rs[0];
    },
    async BuscarItemPorId(cotizacion) {
        let rs = await MySql.query(`CALL sp_cotizaciones_curvas_buscarPorId(${cotizacion.id})`);

        return rs[0];
    },
    async BuscarFtPorId(cotizacion) {
        let rs = await MySql.query(`CALL sp_cotizaciones_ft_buscarPorId(${cotizacion.id})`);

        return rs[0][0];
    },
    async BuscarFtHojaConsumoPorId(cotizacion) {
        let rs = await MySql.query(`CALL sp_cotizaciones_ft_consumo_buscarPorId(${cotizacion.id})`);

        return rs[0][0];
    },
    async BuscarHojaCotizacionesPorId(cotizacion) {
        let rs = await MySql.query(`CALL sp_cotizaciones_hcot_buscarPorId(${cotizacion.id})`);

        return rs[0][0];
    },
    async BuscarHojaCotizacionesRutasPorId(cotizacion, estado = 1) {
        let rs = await MySql.query(`CALL sp_cotizaciones_hcot_rutas_buscarPorId(${cotizacion.id}, ${estado})`);

        return rs[0];
    },
    async BuscarHojaCotizacionesAviosPorId(cotizacion, estado = 1) {
        let rs = await MySql.query(`CALL sp_cotizaciones_hcot_avios_buscarPorId(${cotizacion.id}, ${estado})`);

        return rs[0];
    },
    async BuscarHojaCotizacionesSecuenciasPorId(cotizacion, estado = 1) {
        let rs = await MySql.query(`CALL sp_cotizaciones_hcot_secuencias_buscarPorId(${cotizacion.id}, ${estado})`);

        return rs[0];
    },
    async RegistrarFTHojaCotizacion(cotizacion) {
        let rs = await MySql.query(`CALL sp_cotizaciones_registrar_ft_hoja_cotizacion(
            ${cotizacion.cotizacion_id}, '${cotizacion.descripcion}','${cotizacion.estilo_interno}',
            '${cotizacion.proceso}', '${cotizacion.imagen1}', '${cotizacion.imagen2}','${cotizacion.imagen3}'
        )`);

        return rs;
    },
    async EliminarFTHojaCotizacionRutas(id) {
        let rs = await MySql.query(`CALL sp_cotizaciones_eliminar_ft_hoja_cotizacion_rutas(${id})`);

        return rs;
    },
    async RegistrarFTHojaCotizacionRutas(ruta) {
        let rs = await MySql.query(`CALL sp_cotizaciones_registrar_ft_hoja_cotizacion_rutas(
            ${ruta.cotizacion_id}, '${ruta.rutas}', '${ruta.observacion}'
        )`);

        return rs;
    },
    async EliminarFTHojaCotizacionAvios(id) {
        let rs = await MySql.query(`CALL sp_cotizaciones_eliminar_ft_hoja_cotizacion_avios(${id})`);

        return rs;
    },
    async EliminarFTHojaCotizacionSecuencias(id) {
        let rs = await MySql.query(`CALL sp_cotizaciones_eliminar_ft_hoja_cotizacion_secuencias(${id})`);

        return rs;
    },
    async RegistrarFTHojaCotizacionAvios(avios) {
        let rs = await MySql.query(`CALL sp_cotizaciones_registrar_ft_hoja_cotizacion_avios(
            ${avios.cotizacion_id}, '${avios.descripcion}', '${avios.consumo}', '${avios.unidad_medida}'
        )`);

        return rs;
    },
    async RegistrarFTHojaCotizacionSecuencias(secuencias) {
        let rs = await MySql.query(`CALL sp_cotizaciones_registrar_ft_hoja_cotizacion_secuencias(
            ${secuencias.cotizacion_id}, '${secuencias.secuencia}', '${secuencias.descripcion}', 
            '${secuencias.merma}', ${secuencias.maquina_id}, '${secuencias.puntadas}'
        )`);

        return rs;
    },
    async RegistrarFTHojaConsumo(consumo) {
        let rs = await MySql.query(`CALL sp_cotizaciones_registrar_ft_hoja_consumo(
            ${consumo.cotizacion_id}, '${consumo.encogimiento_molde}',
            '${consumo.minutaje_corte}'
        )`);

        return rs;
    },
    async RegistrarFichaTextil(textil) {
        let rs = await MySql.query(`CALL sp_cotizaciones_textil_registrar(
            ${textil.cotizacion_id}, ${textil.tipo}, '${textil.articulo}', '${textil.color}',
            '${textil.titulo_tela}', '${textil.ancho_total}', '${textil.densidad_aw}',
            '${textil.densidad_bw}', '${textil.proveedor}', '${textil.revirado}',
            '${textil.encogimiento_largo}', '${textil.encogimiento_ancho}', '${textil.precio}'
        )`);

        return rs;
    },
    async ActualizarFichaTextil(textil) {
        let rs = await MySql.query(`CALL sp_cotizaciones_textil_actualizar_ft_consumos(
            ${textil.cotizacion_id}, ${textil.tipo}, '${textil.largo_tizado_a}', '${textil.tolerancia}',
            '${textil.componente}', '${textil.eficiencia}', '${textil.largo_tizado_b}',  
            '${textil.consumo_neto}', '${textil.merma_corte}'
        )`);

        return rs;
    },
    async ActualizarCotizacion(cotizacion) {
        let rs = await MySql.query(`CALL sp_cotizaciones_actualizar(
            ${cotizacion.cliente_id}, ${cotizacion.usuario_id}, ${cotizacion.temporada_id},
            '${cotizacion.estilo}', '${cotizacion.tipo_tela}', '${cotizacion.composicion_tela}',
            '${cotizacion.complemento1}', '${cotizacion.complemento2}', '${cotizacion.complemento3}',
            '${cotizacion.complemento4}', '${cotizacion.tp_archivo}', '${cotizacion.hm_archivo}',
            '${cotizacion.id}')`);

        return rs;
    }
}