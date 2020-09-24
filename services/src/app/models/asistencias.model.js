import MySql from '../../config/database';

export default {
  async Listar() {
    let rs = await MySql.query(`CALL sp_asistencias_listar()`);

    return rs[0];
  },
  async Registrar(asistencia) {
    let rs = await MySql.query(`CALL sp_asistencias_registrar(
            '${asistencia.tipo_asistencia}', ${asistencia.id_personal})`);

    return rs;
  }
};
