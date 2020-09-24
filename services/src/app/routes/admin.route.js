import { Router } from 'express';
import JWT from '../middlewares/jwt.middleware';
import Modulos from '../controllers/modulos.controller';
import Usuarios from '../controllers/usuarios.controller';
import Roles from '../controllers/roles.controller';
import Auth from '../controllers/auth.controller';

const router = Router();

router.get('/configuracion/detalles', JWT.CheckJWT, Auth.DetallesSistema);
router.get('/modulos/listar-modulos-disponibles', JWT.CheckJWT, Modulos.HabilitarModulos);
router.get('/roles/listar-roles', JWT.CheckJWT, Roles.Listar);
router.get('/roles/listar-roles-registrados', JWT.CheckJWT, Roles.ListarRolesRegistrados);
router.post('/usuarios/registrar-usuario', JWT.CheckJWT, Usuarios.Signin);
router.get('/usuarios/listar-usuarios', JWT.CheckJWT, Usuarios.Listar);
router.get('/modulos/listar-modulos', JWT.CheckJWT, Modulos.Listar);
router.post('/modulos/registrar-modulo', JWT.CheckJWT, Modulos.Registrar);
router.get('/modulos/listar-rutas', JWT.CheckJWT, Modulos.ListarRutas);
router.post('/modulos/registrar-ruta', JWT.CheckJWT, Modulos.RegistrarRutas);
router.post('/roles/registrar-roles-accesos', JWT.CheckJWT, Roles.RegistrarRolRuta);

export default router;