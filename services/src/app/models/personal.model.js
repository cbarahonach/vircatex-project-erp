import MySql from '../../config/database';

export default {
  async Listar(estado = 1) {
    let rs = await MySql.query(`CALL sp_personal_listar(${estado})`);

    return rs[0];
  },

  async Registrar(personal) {
    let rs = await MySql.query(`CALL sp_personal_registrar(
            '${personal.nombres}', '${personal.apellidos}', '${personal.area}',
             '${personal.hora_ingreso}', '${personal.hora_salida}')`);

    return rs;
  },

  async Eliminar(id) {
    let rs = await MySql.query(`CALL sp_eliminar_personal( ${id.id} )`);
    return rs;
  },

  async BuscarPorId(id) {
    let rs = await MySql.query(`CALL sp_personal_buscarPorId(${id})`);

    if (rs[0].length > 0) {
      return rs[0][0];
    }

    return rs[0];
  },

  async Actualizar(personal) {
    let rs = await MySql.query(
      `CALL sp_personal_actualizar('${personal.nombres}', '${personal.apellidos}', '${personal.area}',
       '${personal.hora_ingreso}', '${personal.hora_salida}', ${personal.id})`
    );
    return rs;
  }
};
