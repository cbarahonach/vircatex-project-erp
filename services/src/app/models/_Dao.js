import Joi from '@hapi/joi';

export default {
  Usuarios() {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      rol_id: Joi.number()
        .integer()
        .min(1)
        .required(),
      nombre: Joi.string()
        .min(5)
        .max(100)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(5)
        .required(),
      deleted_status: Joi.number().required(),
      created_at: Joi.string().required().allow('').allow(null),
      updated_at: Joi.string().required().allow('').allow(null),
      deleted_at: Joi.string().required().allow('').allow(null)
    });

    return schema;
  },
  Bancos() {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      nombre: Joi.string()
        .max(100)
        .required(),
      deleted_status: Joi.number().required(),
      created_at: Joi.string().required().allow('').allow(null),
      updated_at: Joi.string().required().allow('').allow(null),
      deleted_at: Joi.string().required().allow('').allow(null)
    });

    return schema;

  },
  Clientes() {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      usuario_id: Joi.number().required(),
      pais_id: Joi.number().required(),
      tc_id: Joi.number().required(),
      division_id: Joi.number().required(),
      volumen_id: Joi.number().required(),
      nombre: Joi.string().min(3).max(255).required(),
      contacto_nombre: Joi.string().min(5).max(255).required().allow('').allow(null),
      contacto_email: Joi.string().email().required().allow('').allow(null),
      contacto_telefono: Joi.string().min(5).max(255).required().allow('').allow(null),
      deleted_status: Joi.number().required(),
      created_at: Joi.string().required().allow('').allow(null),
      updated_at: Joi.string().required().allow('').allow(null),
      deleted_at: Joi.string().required().allow('').allow(null)
    });

    return schema;
  },
  Cotizaciones() {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      usuario_id: Joi.number().required(),
      cliente_id: Joi.number().required(),
      temporada_id: Joi.number().required(),
      codigo: Joi.string().allow('').max(100).required(),
      estilo: Joi.string().allow('').max(255).required().allow('').allow(null),
      tipo_tela: Joi.string().allow('').max(255).required().allow('').allow(null),
      composicion_tela: Joi.string().allow('').max(255).required().allow('').allow(null),
      complemento1: Joi.string().required().allow('').allow(null),
      complemento2: Joi.string().required().allow('').allow(null),
      complemento3: Joi.string().required().allow('').allow(null),
      complemento4: Joi.string().required().allow('').allow(null),
      tp_archivo: Joi.string().required().allow(''),
      hm_archivo: Joi.string().required().allow(''),
      deleted_status: Joi.number().required(),
      created_at: Joi.string().allow('').required(),
      updated_at: Joi.string().allow('').allow(null),
      deleted_at: Joi.string().allow('').allow(null),
    });

    return schema;
  },
  CotizacionesTextil() {
    const schema = Joi.object().keys({
      cotizacion_id: Joi.number().required(),
      tipo: Joi.number().required(),
      articulo: Joi.string().allow('').allow(null),
      color: Joi.string().allow('').allow(null),
      titulo_tela: Joi.string().allow('').allow(null),
      ancho_total: Joi.string().allow('').allow(null),
      densidad_aw: Joi.string().allow('').allow(null),
      densidad_bw: Joi.string().allow('').allow(null),
      proveedor: Joi.string().allow('').allow(null),
      revirado: Joi.string().allow('').allow(null),
      encogimiento_largo: Joi.string().allow('').allow(null),
      encogimiento_ancho: Joi.string().allow('').allow(null),
      precio: Joi.string().allow('').allow(null),
      largo_tizado_a: Joi.string().allow('').allow(null),
      tolerancia: Joi.string().allow('').allow(null),
      componente: Joi.string().allow('').allow(null),
      eficiencia: Joi.string().allow('').allow(null),
      largo_tizado_b: Joi.string().allow('').allow(null),
      consumo_neto: Joi.string().allow('').allow(null),
      merma_corte: Joi.string().allow('').allow(null),
      deleted_status: Joi.number().required(),
      created_at: Joi.string().allow('').required(),
      updated_at: Joi.string().allow('').allow(null),
      deleted_at: Joi.string().allow('').allow(null),
    });

    return schema;
  },
  HojaCotizacion() {
    const schema = Joi.object().keys({
      cotizacion_id: Joi.number().required(),
      descripcion: Joi.string().required().allow(''),
      estilo_interno: Joi.string().required().allow(''),
      proceso: Joi.string().required().allow(''),
      imagen1: Joi.string().required().allow(''),
      imagen2: Joi.string().required().allow(''),
      imagen3: Joi.string().required().allow(''),
      deleted_status: Joi.number().required(),
      created_at: Joi.string().allow('').required(),
      updated_at: Joi.string().allow('').allow(null),
      deleted_at: Joi.string().allow('').allow(null),
    });

    return schema;
  },
  HojaCotizacionRutas() {
    const schema = Joi.object().keys({
      cotizacion_id: Joi.number().required(),
      rutas: Joi.string().required(),
      observacion: Joi.string().required(),
      deleted_status: Joi.number().required(),
      created_at: Joi.string().allow('').required(),
      updated_at: Joi.string().allow('').allow(null),
      deleted_at: Joi.string().allow('').allow(null),
    });

    return schema;
  },
  HojaCotizacionAvios() {
    const schema = Joi.object().keys({
      cotizacion_id: Joi.number().required(),
      descripcion: Joi.string().required(),
      consumo: Joi.number().required(),
      unidad_medida: Joi.string().required(),
      deleted_status: Joi.number().required(),
      created_at: Joi.string().allow('').required(),
      updated_at: Joi.string().allow('').allow(null),
      deleted_at: Joi.string().allow('').allow(null),
    });

    return schema;
  },
  HojaCotizacionSecuencias() {
    const schema = Joi.object().keys({
      cotizacion_id: Joi.number().required(),
      secuencia: Joi.string().required(),
      descripcion: Joi.string().required(),
      merma: Joi.string().required(),
      maquina_id: Joi.number().required(),
      puntadas: Joi.string().required(),
      deleted_status: Joi.number().required(),
      created_at: Joi.string().allow('').required(),
      updated_at: Joi.string().allow('').allow(null),
      deleted_at: Joi.string().allow('').allow(null),
    });

    return schema;
  },
  HojaConsumos() {
    const schema = Joi.object().keys({
      cotizacion_id: Joi.number().required(),
      encogimiento_molde: Joi.string().required().allow(''),
      minutaje_corte: Joi.string().allow('').allow(null),
      deleted_status: Joi.number().required(),
      created_at: Joi.string().allow('').required(),
      updated_at: Joi.string().allow('').allow(null),
      deleted_at: Joi.string().allow('').allow(null),
    });

    return schema;
  },
  Modulos() {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      nombre: Joi.string()
        .min(5)
        .max(255)
        .required(),
      ruta: Joi.string()
        .min(5)
        .max(255)
        .required(),
      deleted_status: Joi.number().required(),
      created_at: Joi.string().required().allow('').allow(null),
      updated_at: Joi.string().required().allow('').allow(null),
      deleted_at: Joi.string().required().allow('').allow(null)
    });

    return schema;
  },
  ModulosRutas() {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      modulo_id: Joi.number().required(),
      nombre: Joi.string()
        .min(5)
        .max(100)
        .required(),
      ruta: Joi.string()
        .min(5)
        .max(100)
        .required(),
      deleted_status: Joi.number().required(),
      created_at: Joi.string().required().allow('').allow(null),
      updated_at: Joi.string().required().allow('').allow(null),
      deleted_at: Joi.string().required().allow('').allow(null)
    });

    return schema;
  },
  HojaMinutos() {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      cotizacion_id: Joi.number().required(),
      analista: Joi.string().required(),
      fecha: Joi.string().required(),
      po: Joi.string().required().allow(''),
      tipo_prenda: Joi.string().required().allow(''),
      tela_cuerpo_1: Joi.string().required().allow(''),
      tela_cuerpo_2: Joi.string().required().allow(''),
      artes: Joi.string().required().allow(''),
      acabados: Joi.string().required().allow(''),
      tallas: Joi.string().required().allow(''),
      jornada: Joi.string().required().allow(''),
      operarios: Joi.string().required().allow(''),
      eficiencia: Joi.string().required().allow(''),
      quiero_sacar: Joi.string().allow('').allow(null),
      si_tengo: Joi.string().allow('').allow(null),
      tpo_corte: Joi.string().allow('').allow(null),
      tpo_acabados: Joi.string().allow('').allow(null),
      deleted_status: Joi.number().required(),
      created_at: Joi.string().required().allow('').allow(null),
      updated_at: Joi.string().required().allow('').allow(null),
      deleted_at: Joi.string().required().allow('').allow(null)
    });
    return schema;
  },
  HojaMinutosOperaciones() {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      bloque: Joi.string().required(),
      operacion: Joi.string().required(),
      ts: Joi.string().required(),
      cat: Joi.string().required(),
      id_maquina: Joi.number().required(),
      id_hoja_minutos: Joi.number().required(),
      deleted_status: Joi.number().required(),
      created_at: Joi.string().required().allow('').allow(null),
      updated_at: Joi.string().required().allow('').allow(null),
      deleted_at: Joi.string().required().allow('').allow(null)
    });

    return schema;
  },
  Personal() {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      nombres: Joi.string().required(),
      apellidos: Joi.string().required(),
      area: Joi.string().required(),
      hora_ingreso: Joi.any().required(),
      hora_salida: Joi.any().required(),
      deleted_status: Joi.number().required(),
      created_at: Joi.string().required().allow('').allow(null),
      updated_at: Joi.string().required().allow('').allow(null),
      deleted_at: Joi.string().required().allow('').allow(null)
    });

    return schema;
  },
  Proveedor() {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      razon_social: Joi.string().required(),
      ruc: Joi.string().required(),
      direccion: Joi.string().required().allow(''),
      telefono: Joi.string().required().max(50).allow(''),
      forma_pago_id: Joi.number().required(),
      banco_id: Joi.number().required(),
      num_cuenta: Joi.string().required().allow(''),
      num_cuenta_interbancaria: Joi.string().required().allow(''),
      moneda_id: Joi.number().required(),
      correo: Joi.string().required().allow(''),
      deleted_status: Joi.number().required(),
      created_at: Joi.string().required().allow('').allow(null),
      updated_at: Joi.string().required().allow('').allow(null),
      deleted_at: Joi.string().required().allow('').allow(null)
    });

    return schema;
  },
  OrdenCompra() {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      usuario_id: Joi.number().required(),
      tipo_orden: Joi.number().required(),
      proveedor_id: Joi.number().required(),
      programa: Joi.string().required(),
      po: Joi.string().required(),
      igv: Joi.number().required(),
      fecha_entrega: Joi.string().required(),
      deleted_status: Joi.number().required(),
      created_at: Joi.string().required().allow('').allow(null),
      updated_at: Joi.string().required().allow('').allow(null),
      deleted_at: Joi.string().required().allow('').allow(null)

    });
    return schema;

  },
  OrdenCompraItems() {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      orden_compra_id: Joi.number().required(),
      item: Joi.string().required(),
      concepto: Joi.string().required(),
      cantidad: Joi.number().required(),
      unidad_medida: Joi.string().required(),
      precio_unitario: Joi.number().required(),
      deleted_status: Joi.number().required(),
      created_at: Joi.string().required().allow('').allow(null),
      updated_at: Joi.string().required().allow('').allow(null),
      deleted_at: Joi.string().required().allow('').allow(null)

    });
    return schema;

  }
};
