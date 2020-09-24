import { Router } from 'express';
import JWT from '../middlewares/jwt.middleware';
import Externo from '../controllers/externo.controller';

const router = Router();

router.post('/reportes/registrar-reporte-textil', JWT.CheckJWT, Externo.RegistrarFichaTecnica);
router.get('/reportes/listar-reporte-textil', JWT.CheckJWT, Externo.ListarFichaTecnica);
router.post('/reportes/actualizar-reporte-textil', JWT.CheckJWT, Externo.ActualizarFichaTecnica);
router.post('/reportes/eliminar-reporte-textil-por-id', JWT.CheckJWT, Externo.EliminarFichaTecnica);

router.get('/reportes/listar-reporte-manufactura', JWT.CheckJWT, Externo.ListarReporteManufactura);
router.post('/reportes/registrar-reporte-manufactura', JWT.CheckJWT, Externo.RegistrarReporteManufactura);
router.post('/reportes/actualizar-reporte-manufactura', JWT.CheckJWT, Externo.ActualizarReporteManufactura);
router.post('/reportes/buscar-reporte-por-id', JWT.CheckJWT, Externo.BuscarReporteManufactura);
router.post('/reportes/eliminar-reporte-manufactura-por-id', JWT.CheckJWT, Externo.EliminarReporteManufactura)

export default router;