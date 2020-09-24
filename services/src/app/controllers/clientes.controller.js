import HttpStatus from 'http-status-codes';
import DAO from '../models/_Dao';
import Clientes from '../models/clientes.model';
import Paises from '../models/paises.model';
import TiposClientes from '../models/tiposClientes.model';
import Divisiones from '../models/divisiones.model';
import Volumenes from '../models/volumenes.model';

export default {
  async UtilidadesRegistrarCliente(req, res) {
    let paises = await Paises.Listar();
    let tipos_clientes = await TiposClientes.Listar();
    let divisiones = await Divisiones.Listar();
    let volumenes = await Volumenes.Listar();

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Datos de utilidad.',
      data: {
        paises: paises,
        tipos_clientes: tipos_clientes,
        divisiones: divisiones,
        volumenes: volumenes
      }
    });
  },
  async ListarClientes(req, res) {
    let clientes = await Clientes.Listar();

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Listado de clientes.',
      data: clientes
    });
  },
  async RegistrarCliente(req, res) {
    const schema = DAO.Clientes();
    const { error, value } = schema.validate(req.body);

    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error.details[0]);
    }

    let rs = await Clientes.Registrar(value);

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Registro de cliente exitoso.',
      data: rs
    });
  },
  async BuscarClientePorId(req, res) {
    let id = req.body.id_cliente;

    let rs = await Clientes.BuscarPorId(id);

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: `Usuario con ID: ${id}`,
      data: rs
    });
  },

  async ActualizarClientes(req, res) {
    let rs = await Clientes.Actualizar(req.body);

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Actualizacion de cliente exitoso.',
      data: rs
    });
  }
};
