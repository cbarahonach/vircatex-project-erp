import MySql from '../../config/database';

export default {
  async Ver() {
    let rs = await MySql.query(`CALL sp_configuracion_sistema_ver()`);

    return rs[0][0];
  }
};
