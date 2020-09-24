import MySql from '../../config/database';

export default {
  async Registrar(ordenCompraItem , id_cotizacion) {
    let rs = await MySql.query(`CALL sp_orden_compras_items_registrar(
           
        ${id_cotizacion},'${ordenCompraItem.item}','${ordenCompraItem.concepto}',
        '${ordenCompraItem.cantidad}','${ordenCompraItem.unidad_medida}','${ordenCompraItem.precio_unitario}'
           
        )`);

    return rs;
  }
};
