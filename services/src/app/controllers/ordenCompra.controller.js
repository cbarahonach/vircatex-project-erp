import HttpStatus from 'http-status-codes';
import DAO from '../models/_Dao';
import OrdenCompra from '../models/ordenCompra.model';
import Proveedor from '../models/proveedores.model';
import OrdenCompraItem from '../models/ordenCompraItem.model';
import FormasPagos from '../models/formasPagos.model';
import Monedas from '../models/monedas.model';
import Bancos from '../models/bancos.model';
import Helper from './_helper';

export default {
  async UtilidadesRegistrarOrden(req, res) {
    let formasPagos = await FormasPagos.Listar();
    let monedas = await Monedas.Listar();
    let bancos = await Bancos.Listar();

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Listado de Utilidades.',
      data: { formasPagos, monedas, bancos }
    });
  },
  async RegistrarOrdenCompra(req, res) {
    const schema = DAO.OrdenCompra();
    const { error, value } = schema.validate(req.body.ordenCompra);

    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error.details[0]);
    }

    let rs = await OrdenCompra.Registrar(value);
    
    let last_id = rs[1][0]['@max_id'];
    let items_response = [];
    for (let item of req.body.items) {
      items_response.push(await OrdenCompraItem.Registrar(item, last_id));
    }

    await Proveedor.RegistrarProveedorOrdenCompra(req.body.proveedor, req.body.proveedor.id);

    let tipo_orden = value.tipo_orden;
    let result = {};
    switch (tipo_orden) {
      case 1:
        result.codigo = 'VIT' + Helper.zfill(rs[1][0]['@configuracion_orden_compra'], 5);
        result.text = `Orden de compra registrado exitosamente.`;
        break;
      case 2:
        result.codigo = 'VIT' + Helper.zfill(rs[1][0]['@configuracion_orden_compra_servicio'], 5);
        result.text = `Orden de servicio registrado exitosamente.`;
        break;
      default:
    }

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Orden de Compra registrada satisfactoriamente.',
      data: result
    });
  },

  async ListarOrdenes(req, res) {
    let ordenCompra = await OrdenCompra.Listar(1);
    let ordenServicio = await OrdenCompra.Listar(2);
    
    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Listado de Orden compras y servicios.',
      data: { ordenCompra, ordenServicio }
    });
  },

  async ListarOrdenCompraItemPorId(req, res) {
    let id = req.body.id_orden_compra;
    let rs = await OrdenCompra.ListarOrdenCompraItemPorId(id);

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: `Ordenes Compra con  ID: ${id}`,
      data: rs
    });
  },

  async ListarOrdenCompraPorId(req, res) {
    console.log(req.body);
    let id = req.body.id_orden_compra;
    let rs = await OrdenCompra.ListarOrdenCompraPorId(id);

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: `Orden  Compra con  ID: ${id}`,
      data: rs
    });
  },

  async EliminarOrdenCompraId(req, res) {
    let id = req.body.id_orden_compra;
    let rs = await OrdenCompra.EliminarOrdenCompraId(id);

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: `Orden Compra Eliminada con  ID: ${id}`,
      data: rs
    });
  },

  
};
