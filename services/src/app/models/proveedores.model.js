import MySql from '../../config/database';

export default {
    async Listar(estado = 1) {
        let rs = await MySql.query(`CALL sp_proveedores_listar(${estado})`);
        
        return rs[0];
    },
    async Registrar(proveedor) {
        let rs = await MySql.query(`CALL sp_proveedores_registrar(
            ${proveedor.forma_pago_id},${proveedor.moneda_id},'${proveedor.razon_social}',
            '${proveedor.ruc}','${proveedor.direccion}','${proveedor.telefono}',
            ${proveedor.banco_id},'${proveedor.num_cuenta}',
            '${proveedor.num_cuenta_interbancaria}','${proveedor.correo}'
        )`);
        return rs;
    },

    async RegistrarProveedorOrdenCompra(proveedor,id) {
        let rs = await MySql.query(`CALL sp_proveedor_actualizar_orden_compra(
            ${proveedor.forma_pago_id},${proveedor.moneda_id},
            ${proveedor.banco_id},
            '${proveedor.num_cuenta}','${proveedor.num_cuenta_interbancaria}',
            ${id}
        )`);
        return rs;
    },
    async Eliminar(id) {
        let rs = await MySql.query(`CALL sp_proveedores_eliminar(${id})`);
        return rs[0];
    },

    async ListarPorId(id ,estado=1) {
        let rs = await MySql.query(`CALL sp_proveedores_listar_por_id(${id},${estado})`);
        console.log(rs);
        return rs[0];
    },

    async Actualizar(proveedor) {
        let rs = await MySql.query(`CALL sp_proveedores_actualizar(
            ${proveedor.forma_pago_id},
            ${proveedor.moneda_id},
            '${proveedor.razon_social}',
            '${proveedor.ruc}',
            '${proveedor.direccion}',
            '${proveedor.telefono}',
             ${proveedor.banco_id},
            '${proveedor.num_cuenta}',
            '${proveedor.num_cuenta_interbancaria}',
            '${proveedor.correo}',
            ${proveedor.id}
            
            )`);
        console.log(rs);
        return rs[0];
    }

}