import MySql from '../../config/database';

export default {
    async Listar(estado = 1) {
        let rs = await MySql.query(`CALL sp_volumenes_listar(${estado})`);
        
        return rs[0];
    },

}