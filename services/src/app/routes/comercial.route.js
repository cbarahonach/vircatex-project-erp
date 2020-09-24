import { Router } from 'express';
import JWT from '../middlewares/jwt.middleware';
import Clientes from '../controllers/clientes.controller';
import Cotizaciones from '../controllers/cotizaciones.controller';

const router = Router();

router.get('/clientes/utilidades-registrar-cliente', JWT.CheckJWT, Clientes.UtilidadesRegistrarCliente);
router.get('/clientes/listar-clientes', JWT.CheckJWT, Clientes.ListarClientes);
router.post('/clientes/registrar-cliente', JWT.CheckJWT, Clientes.RegistrarCliente);
router.post('/clientes/buscar-cliente', JWT.CheckJWT, Clientes.BuscarClientePorId);
router.post('/clientes/actualizar-clientes', JWT.CheckJWT, Clientes.ActualizarClientes);

router.get('/cotizaciones/utilidades-registrar-cotizacion', JWT.CheckJWT, Cotizaciones.UtilidadesRegistrarCotizacion);
router.get('/cotizaciones/listar-cotizaciones', JWT.CheckJWT, Cotizaciones.ListarCotizaciones);
router.post('/cotizaciones/registrar-cotizacion', JWT.CheckJWT, Cotizaciones.RegistrarCotizacion);
router.post('/cotizaciones/buscar-cotizacion-ft-por-id', JWT.CheckJWT, Cotizaciones.BuscarCotizacionFtPorId);
router.post('/cotizaciones/buscar-cotizacion-textil-por-id', JWT.CheckJWT, Cotizaciones.BuscarCotizacionTextilPorId);
router.post('/cotizaciones/buscar-cotizacion-por-id', JWT.CheckJWT, Cotizaciones.BuscarCotizacionPorId);
router.post('/cotizaciones/buscar-cotizacion-ft-consumo-por-id', JWT.CheckJWT, Cotizaciones.BuscarCotizacionFtConsumoPorId);
router.post('/cotizaciones/registrar-ft-hoja-cotizacion', JWT.CheckJWT, Cotizaciones.RegistrarFTHojaCotizacion);
router.post('/cotizaciones/registrar-ft-hoja-consumo', JWT.CheckJWT, Cotizaciones.RegistrarFTHojaConsumo);
router.post('/cotizaciones/registrar-ficha-textil', JWT.CheckJWT, Cotizaciones.RegistrarFichaTextil);
router.post('/cotizaciones/listar-hoja-minutos', JWT.CheckJWT, Cotizaciones.ListarHojaMinutos);
router.post('/cotizaciones/registrar-hoja-minutos', JWT.CheckJWT, Cotizaciones.RegistrarHojaMinutos);
router.post('/cotizaciones/listar-hoja-minutos-operaciones', JWT.CheckJWT, Cotizaciones.ListarHojaMinutosOperaciones);
router.post('/cotizaciones/registrar-hoja-minutos-operaciones', JWT.CheckJWT, Cotizaciones.RegistrarHojaMinutosOperaciones);
router.get('/cotizaciones/listar-maquinas-operaciones', JWT.CheckJWT, Cotizaciones.ListarMaquinasOperaciones);

export default router;