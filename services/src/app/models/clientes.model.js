import MySql from '../../config/database';

export default {
  async Listar(estado = 1) {
    let rs = await MySql.query(`CALL sp_clientes_listar(${estado})`);

    return rs[0];
  },
  async ListarUtility(estado = 1) {
    let rs = await MySql.query(`CALL sp_clientes_listar_utility(${estado})`);

    return rs[0];
  },
  async Registrar(cliente) {
    let rs = await MySql.query(`CALL sp_clientes_registrar(
            '${cliente.nombre}', '${cliente.contacto_nombre}', '${cliente.contacto_email}', '${cliente.contacto_telefono}',
            ${cliente.usuario_id}, ${cliente.pais_id}, ${cliente.tc_id}, ${cliente.division_id}, ${cliente.volumen_id}
        )`);

    return rs;
  },
  async BuscarPorId(id) {
    let rs = await MySql.query(`CALL sp_clientes_buscarPorId(${id})`);

    if (rs[0].length > 0) {
      return rs[0][0];
    }

    return rs[0];
  },

  async Actualizar(cliente) {
    let rs = await MySql.query(
      `CALL sp_clientes_actualizar('${cliente.nombre}', ${cliente.pais_id}, ${cliente.tc_id},
       '${cliente.contacto_nombre}', '${cliente.contacto_email}', '${cliente.contacto_telefono}',
        ${cliente.division_id}, ${cliente.volumen_id}, ${cliente.id})`
    );
    return rs;
  }
};
