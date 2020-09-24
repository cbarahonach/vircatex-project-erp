import { Router } from 'express';
import JWT from '../middlewares/jwt.middleware';
import Personal from '../controllers/personal.controller';
import Asistencias from '../controllers/asistencias.controller';

const router = Router();

router.post('/personal/registrar-personal', JWT.CheckJWT, Personal.RegistrarPersonal);
router.get('/personal/listar-personal', JWT.CheckJWT, Personal.ListarPersonal);
router.post('/personal/eliminar-personal', JWT.CheckJWT, Personal.EliminarPersonal);
router.post('/personal/buscar-personal', JWT.CheckJWT,Personal.BuscarPersonalPorId);
router.post('/personal/actualizar-personal', JWT.CheckJWT, Personal.ActualizarPersonal);
router.post('/asistencias/registrar-asistencias', JWT.CheckJWT, Asistencias.RegistrarAsistencias);
router.get('/asistencias/listar-asistencias', JWT.CheckJWT, Asistencias.ListarAsistencias);

export default router;
