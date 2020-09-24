import HttpStatus from 'http-status-codes';
import Personal from '../models/personal.model';
import DAO from '../models/_Dao';

export default {
  async ListarPersonal(req, res) {
    let personal = await Personal.Listar();
    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Listado de Personal.',
      data: personal
    });
  },

  async RegistrarPersonal(req, res) {
    const schema = DAO.Personal();
    const { error, value } = schema.validate(req.body);

    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error.details[0]);
    }

    let rs = await Personal.Registrar(value);

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Registro del personal exitoso.',
      data: rs
    });
  },

  async EliminarPersonal(req, res) {
    let rs = await Personal.Eliminar(req.body);

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Se elimino correctamente',
      data: rs
    });
  },

  async BuscarPersonalPorId(req, res) {
    let id = req.body.id_personal;

    let rs = await Personal.BuscarPorId(id);

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: `Personal con ID: ${id}`,
      data: rs
    });
  },

  async ActualizarPersonal(req, res) {    
    let rs = await Personal.Actualizar(req.body);

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Actualizacion del personal correcta.',
      data: rs
    });
  }
};
