import { Router } from 'express';
import JWT from '../middlewares/jwt.middleware';
import Proveedor from '../controllers/proveedor.controller';
import OrdenCompra from '../controllers/ordenCompra.controller';

const router = Router();

router.get('/proveedor/utilidades-registrar-proveedor', JWT.CheckJWT, Proveedor.UtilidadesRegistrarProveedor);
router.post('/proveedor/registrar-proveedor', JWT.CheckJWT, Proveedor.RegistrarProveedor);
router.get('/proveedor/listar-proveedores', JWT.CheckJWT, Proveedor.ListarProveedores);
router.post('/documento/registrar-orden-compra',JWT.CheckJWT,OrdenCompra.RegistrarOrdenCompra);
router.get('/documento/listar-ordenes', JWT.CheckJWT, OrdenCompra.ListarOrdenes);
router.post('/documento/listar-orden-compra-por-id', JWT.CheckJWT, OrdenCompra.ListarOrdenCompraPorId);
router.post('/documento/listar-orden-compra-item-por-id', JWT.CheckJWT, OrdenCompra.ListarOrdenCompraItemPorId);
router.post('/documento/listar-proveedor-por-id', JWT.CheckJWT, Proveedor.ListarProveedorPorId);
router.post('/documento/eliminar-orden-compra-por-id', JWT.CheckJWT, OrdenCompra.EliminarOrdenCompraId);
router.post('/documento/eliminar-proveedor-por-id', JWT.CheckJWT, Proveedor.EliminarProveedorId);
router.get('/documento/utilidades-registrar-orden', JWT.CheckJWT, OrdenCompra.UtilidadesRegistrarOrden);
router.post('/proveedor/actualizar-proveedor', JWT.CheckJWT, Proveedor.ActualizarProveedor);


export default router;