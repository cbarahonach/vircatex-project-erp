import HttpStatus from 'http-status-codes';
import ReporteTextil from '../models/reportesTextil.model';
import ReporteManufactura from '../models/reportesManufactura.model';

export default {
  async RegistrarFichaTecnica(req, res) {
    let rss = [];

    for (const element of req.body) {
      let rs = await ReporteTextil.Registrar(element);
      rss.push(rs);
    }

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Datos registrados exitosamente.',
      data: {
        rows: req.body.length,
        responses: rss
      }
    });
  },
  async EliminarFichaTecnica(req, res){
    let rs = await ReporteTextil.Eliminar(req.body.reporteId);

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Reporte eliminado satisfactoriamente.',
      data: rs
    })
  },
  async ListarFichaTecnica(req, res) {
    let rs = await ReporteTextil.Listar();

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Listado de fichas tecnicas.',
      data: rs
    });
  },
  async ActualizarFichaTecnica(req, res) {
    let rs = await ReporteTextil.Actualizar(req.body);

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Datos actualizados exitosamente.',
      data: rs
    });
  },
  async RegistrarReporteManufactura(req, res) {
    let rs = await ReporteManufactura.Registrar(req.body);

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Datos registrados exitosamente.',
      data: rs
    });
  },
  async ListarReporteManufactura(req, res) {
    let rs = await ReporteManufactura.Listar();

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Listado de reportes manufactura.',
      data: rs
    });
  },
  async EliminarReporteManufactura(req, res) {
    let rs = await ReporteManufactura.Eliminar(req.body.reportesId);

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Reporte eliminado satisfactoriamente.',
      data: rs
    });
  },
  async ActualizarReporteManufactura(req, res) {
    let rs = await ReporteManufactura.Actualizar(req.body);

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Datos actualizados exitosamente.',
      data: rs
    });
  },
  async BuscarReporteManufactura(req, res) {
    let rs = await ReporteManufactura.BuscarPorId(req.body);

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: `Reporte de manufactura con id ${req.body.id}`,
      data: rs
    });
  }
};
