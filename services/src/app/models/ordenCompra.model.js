import MySql from '../../config/database';

export default {
  async Registrar(ordenCompra) {
    let rs = await MySql.query(`CALL sp_orden_compras_servicios_registrar(
              ${ordenCompra.usuario_id},
              ${ordenCompra.tipo_orden},
              ${ordenCompra.proveedor_id},
              '${ordenCompra.programa}',
              '${ordenCompra.po}',
              '${ordenCompra.fecha_entrega}',
              ${ordenCompra.igv},
              @contador_orden_compra,
              @contador_orden_compra_servicio,
              @configuracion_orden_compra,
              @configuracion_orden_compra_servicio,
              @max_id
        ); select @contador_orden_compra,
        @contador_orden_compra_servicio,
        @configuracion_orden_compra,
        @configuracion_orden_compra_servicio,
        @max_id;
        `);

    return rs;
  },

  async Listar(tipo, estado = 1) {
    let rs = await MySql.query(`CALL sp_orden_compras_servicios_listar(${tipo},${estado})`);

    return rs[0];
  },

  async ListarOrdenCompraItemPorId(id, estado = 1) {
    let rs = await MySql.query(
      `CALL sp_orden_compras_items_listar_por_id(${id}, ${estado})`
    );

    return rs[0];
  },

  async ListarOrdenCompraPorId(id, estado = 1) {
    console.log(id);
    let rs = await MySql.query(
      `CALL sp_orden_compras_listar_por_id(${id},${estado})`
    );

    return rs[0];
  },

  async EliminarOrdenCompraId(id) {
    console.log(id);
    let rs = await MySql.query(
      `CALL sp_orden_compra_eliminar_por_id(${id})`
    );

    return rs[0];
  }
};
