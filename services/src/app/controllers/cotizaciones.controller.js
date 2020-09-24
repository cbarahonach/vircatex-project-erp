import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';
import DAO from '../models/_Dao';
import Cotizaciones from '../models/cotizaciones.model';
import Clientes from '../models/clientes.model';
import Temporadas from '../models/temporadas.model';
import Volumenes from '../models/volumenes.model';
import Tallas from '../models/tallas.model';
import Helper from './_helper';
import HojaMinutos from '../models/hojaMinutos.model';
import Maquinas from '../models/maquinas.model';
import HojaMinutosOperaciones from '../models/hojaMinutosOperaciones.model';

export default {
    async UtilidadesRegistrarCotizacion(req, res) {
        let clientes = await Clientes.ListarUtility();
        let volumenes = await Volumenes.Listar();
        let temporadas = await Temporadas.Listar();
        let tallas = await Tallas.Listar();

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Datos de utilidad.',
            data: {
                clientes: clientes,
                temporadas: temporadas,
                tallas: tallas,
                volumenes: volumenes
            }
        });
    },
    async RegistrarCotizacion(req, res) {
        const schema = DAO.Cotizaciones();
        const { error, value } = schema.validate(req.body.cotizacion);

        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error.details[0]);
        }

        let filename = req.body.filename;

        if (filename.tp.length > 0) {
            value.tp_archivo = Helper.saveImage(filename.tp.split('.').pop(), value.tp_archivo, 'TP');
        }

        if (filename.hm.length > 0) {
            value.hm_archivo = Helper.saveImage(filename.hm.split('.').pop(), value.hm_archivo, 'HM');
        }

        let cotizacion = await Cotizaciones.Registrar(value);

        let cotizacion_id = cotizacion['@last_id'];

        let curvas_response = [];

        for (let curva of req.body.curvas) {
            curvas_response.push(await Cotizaciones.RegistrarItem(curva, cotizacion_id));
        }

        if (cotizacion_id > 0 && curvas_response.length > 0) {
            return res.status(HttpStatus.OK).json({
                type: 'success',
                message: 'Registro de cotización exitoso.',
                data: cotizacion
            })
        }

        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({
                type: 'error',
                message: 'Ocurrio un error, intentelo nuevamente.'
            });

    },
    async ListarCotizaciones(req, res) {
        let cotizaciones = await Cotizaciones.Listar();

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Listado de cotizaciones.',
            data: cotizaciones
        });
    },
    async BuscarCotizacionFtPorId(req, res) {
        const schema = Joi.object().keys({ id: Joi.number().required() });
        const { error, value } = schema.validate(req.body);

        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error.details[0]);
        }

        let cotizacion = await Cotizaciones.BuscarFtPorId(value);

        if (cotizacion === undefined) {
            return res.status(HttpStatus.OK).json({
                type: 'error',
                message: `No existe una cotización con id ${value.id}`,
            })
        }

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: `Cotizacion encontrada con id ${value.id}`,
            data: cotizacion
        })
    },
    async BuscarCotizacionTextilPorId(req, res) {
        const schema = Joi.object().keys({ id: Joi.number().required() });
        const { error, value } = schema.validate(req.body);

        if (error && error.details) {
            return res.status(HttpStatus.BAD_GATEWAY).json(error.details[0]);
        }

        let cotizacion = await Cotizaciones.BuscarPorId(value);
        let textil = await Cotizaciones.BuscarTextilPorId(value);

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Info cotizacion y textil.',
            data: { cotizacion, textil }
        })
    },
    async BuscarCotizacionFtConsumoPorId(req, res) {
        const schema = Joi.object().keys({ id: Joi.number().required() });
        const { error, value } = schema.validate(req.body);

        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error.details[0]);
        }

        let cotizacion = await Cotizaciones.BuscarPorId(value);
        let h_cotizacion = await Cotizaciones.BuscarHojaCotizacionesPorId(value);
        let h_consumos = await Cotizaciones.BuscarFtHojaConsumoPorId(value);
        let tallas = await Cotizaciones.BuscarItemPorId(value);
        let textiles = await Cotizaciones.BuscarTextilPorId(value);

        if (cotizacion === undefined) {
            return res.status(HttpStatus.OK).json({
                type: 'error',
                message: `No existe una cotización con id ${value.id}`,
            })
        }

        if (h_cotizacion === undefined) { h_cotizacion = {} }

        if (h_consumos === undefined) { h_consumos = {}; }

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: `Cotizacion encontrada con id ${value.id}`,
            data: { cotizacion, h_cotizacion, h_consumos, tallas, textiles }
        })
    },
    async BuscarCotizacionPorId(req, res) {
        const schema = Joi.object().keys({ id: Joi.number().required() });
        const { error, value } = schema.validate(req.body);

        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error.details[0]);
        }

        let cotizacion = await Cotizaciones.BuscarPorId(value);

        if (cotizacion === undefined) {
            return res.status(HttpStatus.OK).json({
                type: 'error',
                message: `No existe una cotización con id ${value.id}`,
            })
        }

        let tallas = await Cotizaciones.BuscarItemPorId(value);
        let hoja_cotizacion = await Cotizaciones.BuscarHojaCotizacionesPorId(value);
        let hoja_cotizacion_rutas = await Cotizaciones.BuscarHojaCotizacionesRutasPorId(value);
        let hoja_cotizacion_avios = await Cotizaciones.BuscarHojaCotizacionesAviosPorId(value);
        let hoja_cotizacion_secuencias = await Cotizaciones.BuscarHojaCotizacionesSecuenciasPorId(value);

        if (hoja_cotizacion === undefined) { hoja_cotizacion = {} }

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: `Cotizacion encontrada con id ${value.id}`,
            data: {
                cotizacion, tallas, hoja_cotizacion,
                hoja_cotizacion_rutas, hoja_cotizacion_avios,
                hoja_cotizacion_secuencias
            }
        })
    },
    async RegistrarFTHojaCotizacion(req, res) {
        const schemaCot = DAO.Cotizaciones();
        const schemaHC = DAO.HojaCotizacion();
        const schemaRutas = DAO.HojaCotizacionRutas();
        const schemaAvios = DAO.HojaCotizacionAvios();
        const schemaSecuencias = DAO.HojaCotizacionSecuencias();

        const cotizacion = schemaCot.validate(req.body.cotizacion);
        const hojaCotizacion = schemaHC.validate(req.body.hojaCotizacion);

        if (cotizacion.error && cotizacion.error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(cotizacion.error.details[0]);
        }

        if (hojaCotizacion.error && hojaCotizacion.error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(hojaCotizacion.error.details[0]);
        }

        for (let item of req.body.rutas) {
            item.cotizacion_id = cotizacion.value.id;
            let ruta = schemaRutas.validate(item);

            if (ruta.error && ruta.error.details) {
                return res.status(HttpStatus.BAD_REQUEST).json(ruta.error.details[0]);
            }
        }

        for (let item of req.body.avios) {
            item.cotizacion_id = cotizacion.value.id;
            let avios = schemaAvios.validate(item);

            if (avios.error && avios.error.details) {
                return res.status(HttpStatus.BAD_REQUEST).json(avios.error.details[0]);
            }
        }

        for (let item of req.body.secuencias) {
            item.cotizacion_id = cotizacion.value.id;
            let secuencias = schemaSecuencias.validate(item);

            if (secuencias.error && secuencias.error.details) {
                return res.status(HttpStatus.BAD_REQUEST).json(secuencias.error.details[0]);
            }
        }

        let rutas = req.body.rutas;
        let avios = req.body.avios;
        let secuencias = req.body.secuencias;
        let imagenes = req.body.imagenes;

        for (let index in imagenes) {
            let img = imagenes[index];

            if (img.file.length > 0 &&
                img.file.split(";").length > 1 &&
                img.file.split(";")[1].split(",")[0] == 'base64' &&
                img.extension.length > 0) {
                let imgName = Helper.saveImage(img.extension, img.file, `FT-HCOT-${index}`);

                hojaCotizacion.value[index] = imgName;
            }
        }

        let rs1 = await Cotizaciones.ActualizarCotizacion(cotizacion.value);

        if (rs1.affectedRows <= 0) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                type: 'error',
                message: 'Ocurrio un error al actualizar la cotización. (1)',
                data: []
            });
        }

        hojaCotizacion.value.cotizacion_id = cotizacion.value.id;

        let rs2 = await Cotizaciones.RegistrarFTHojaCotizacion(hojaCotizacion.value);

        if (rs2.affectedRows <= 0) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                type: 'error',
                message: 'Ocurrio un error al actualizar la hoja de cotización. (2)',
                data: []
            });
        }

        await Cotizaciones.EliminarFTHojaCotizacionRutas(cotizacion.value.id);

        for (let ruta of rutas) {
            let rs3 = await Cotizaciones.RegistrarFTHojaCotizacionRutas(ruta);

            if (rs3.affectedRows <= 0) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    type: 'error',
                    message: 'Ocurrio un error al actualizar la hoja de cotización rutas. (3)',
                    data: []
                });
            }
        }

        await Cotizaciones.EliminarFTHojaCotizacionAvios(cotizacion.value.id);

        for (let item of avios) {
            let rs4 = await Cotizaciones.RegistrarFTHojaCotizacionAvios(item);

            if (rs4.affectedRows <= 0) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    type: 'error',
                    message: 'Ocurrio un error al actualizar la hoja de cotización avios. (4)',
                    data: []
                });
            }
        }

        await Cotizaciones.EliminarFTHojaCotizacionSecuencias(cotizacion.value.id);

        for (let item of secuencias) {
            let rs5 = await Cotizaciones.RegistrarFTHojaCotizacionSecuencias(item);

            if (rs5.affectedRows <= 0) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    type: 'error',
                    message: 'Ocurrio un error al actualizar la hoja de cotización secuencias. (5)',
                    data: []
                });
            }
        }

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Hoja de Cotizacion actualizada exitosamente.',
            data: []
        })
    },
    async RegistrarFTHojaConsumo(req, res) {
        const schemaHC = DAO.HojaConsumos();
        const schemaTextil = DAO.CotizacionesTextil();
        const hc = schemaHC.validate(req.body.hojaConsumo);
        const textiles = req.body.textiles;

        if (hc.error && hc.error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(hc.error.details[0]);
        }
        let rsTextil = [];

        for (let index in textiles) {
            let item = textiles[index];
            if (item != null) {
                let textil = schemaTextil.validate(item);

                if (textil.error && textil.error.details) {
                    return res.status(HttpStatus.BAD_REQUEST).json(textil.error.details[0]);
                }

                let query = await Cotizaciones.ActualizarFichaTextil(textil.value);
                rsTextil.push(query);
            }
        }

        let imagen = req.body.imagen;

        if (
            Object.keys(imagen).length > 0 &&
            imagen.file.length > 0 &&
            imagen.file.split(";").length > 1 &&
            imagen.file.split(";")[1].split(",")[0] == 'base64' &&
            imagen.extension.length > 0) {
            let imgName = Helper.saveImage(imagen.extension, imagen.file, `MC`);

            hc.value.minutaje_corte = imgName;
        }

        let rs = await Cotizaciones.RegistrarFTHojaConsumo(hc.value);

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Hoja de Consumo actualizada exitosamente.',
            data: rs
        })
    },
    async RegistrarFichaTextil(req, res) {
        const schema = DAO.CotizacionesTextil();
        const { error, value } = schema.validate(req.body);

        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error.details[0]);
        }

        let rs = await Cotizaciones.RegistrarFichaTextil(value);

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Hoja Textil actualizada exitosamente.',
            data: rs
        })
    },
    async ListarHojaMinutos(req, res) {
        let rs = await HojaMinutos.Listar(req.body.id);
        let cot = await Cotizaciones.BuscarPorId(req.body);
        let tallas = await Cotizaciones.BuscarItemPorId(req.body);

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Listado de Hoja Minutos',
            data: { hoja_minutos: rs, cotizacion: cot, tallas }
        })
    },
    async RegistrarHojaMinutos(req, res) {
        const schema = DAO.HojaMinutos();
        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error.details[0]);
        }

        let result = await HojaMinutos.Registrar(value)

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Hoja minutos registrada exitosamente.',
            data: result
        })
    },
    async ListarHojaMinutosOperaciones(req, res) {
        let rs = await HojaMinutosOperaciones.Listar(req.body.id);

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Listado de Hoja Operaciones',
            data: rs
        })
    },
    async RegistrarHojaMinutosOperaciones(req, res) {
        const schema = DAO.HojaMinutosOperaciones();
        let rs = [];
        let remove = true;

        for (let item of req.body) {
            const { error, value } = schema.validate(item);
            if (error && error.details) {
                return res.status(HttpStatus.BAD_REQUEST).json(error.details[0]);
            }

            if (remove) {
                await HojaMinutosOperaciones.Eliminar(value);
                remove = false;
            }
            const query = await HojaMinutosOperaciones.Registrar(value);
            rs.push(query);
        }

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Registro de operaciones exitoso',
            data: rs
        })
    },
    async ListarMaquinasOperaciones(req, res) {
        let rs = await Maquinas.Listar();

        return res.status(HttpStatus.OK).json({
            type: 'success',
            message: 'Listado de maquinas.',
            data: rs
        })
    }
}