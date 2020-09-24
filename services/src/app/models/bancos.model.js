import MySql from '../../config/database';

export default {
  async Listar(estado = 1) {
    let rs = await MySql.query(`CALL sp_bancos_listar(${estado})`);

    return rs[0];
  },
  async Registrar(banco) {
    let rs = await MySql.query(`CALL sp_bancos_registrar(${banco.nombre})`);

    return rs;
  }
};
