import MySql from '../../config/database';

export default {
    async Verificar(email, estado = 1) {
        let rs = await MySql.query(`CALL sp_usuarios_verificar('${email}', ${estado})`);

        if (rs[0].length > 0) {

            return { status: true, data: rs[0][0] };
        } else {
            return { status: false };
        }
    },
    async Registrar(usuario, hash) {
        let rs = await MySql.query(`CALL sp_usuarios_registrar(
            '${usuario.nombre}', '${usuario.email}', '${hash}', ${usuario.rol_id})
        `);

        return rs;
    },
    async Listar(estado = 1) {
        let rs = await MySql.query(`CALL sp_usuarios_listar(${estado})`);

        return rs[0];
    },
    async CambiarPassword(usuario) {
        let rs = await MySql.query(`CALL sp_usuarios_change_password(
            ${usuario.id}, '${usuario.new_password}'
        )`);

        return rs;
    }
}