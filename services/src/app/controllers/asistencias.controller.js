const Joi = require('@hapi/joi');
const HttpStatus = require('http-status-codes');

import Asistencias from '../models/asistencias.model';

export default {
  async ListarAsistencias(req, res) {
    let asistencias = await Asistencias.Listar();
    
    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Listado de Asistencias.',
      data: asistencias
    });
  },

  async RegistrarAsistencias(req, res) {
    let rs = await Asistencias.Registrar(req.body);

    return res.status(HttpStatus.OK).json({
      type: 'success',
      message: 'Registro de asistencias exitoso.',
      data: rs
    });
  }
};
