import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { appURL } from "../app.uri";
import { ClientesModel } from "../models/clientes.model";
import { CotizacionesModel } from "../models/cotizaciones.model";
import { HojaMinutosModel } from "../models/hojaMinutos.model";
import { HojaMinutosOperacionesModel } from "../models/hojaMinutosOperaciones.model";
import { CotizacionesCurvaModel } from "../models/cotizacionesCurva.model";
import { CotizacionesFTHojaCotizacionModel } from '../models/cotizacionesFTHojaCotizacion.model';
import { CotizacionesFTHojaCotizacionRutasModel } from '../models/cotizacionesFTHojaCotizacionRutas.model';
import { CotizacionesFTHojaCotizacionAviosModel } from '../models/cotizacionesFTHojaCotizacionAvios.model';
import { CotizacionesFTHojaCotizacionSecuenciasModel } from '../models/cotizacionesFTHojaCotizacionSecuencias.model';
import { CotizacionesTextilModel } from '../models/cotizacionesTextil.model';
import { CotizacionesFTHojaConsumoModel } from '../models/cotizacionesFTHojaConsumo.model';

@Injectable({
  providedIn: "root"
})
export class ComercialService {
  constructor(private http: HttpClient) { }

  UtilidadesRegistrarCliente(): Observable<any> {
    return this.http.get(
      `${appURL}/comercial/clientes/utilidades-registrar-cliente`
    );
  }

  RegistrarCliente(cliente: ClientesModel): Observable<any> {
    return this.http.post(
      `${appURL}/comercial/clientes/registrar-cliente`, cliente);
  }

  ListarClientes(): Observable<any> {
    return this.http.get(`${appURL}/comercial/clientes/listar-clientes`);
  }

  BuscarCliente(id_cliente: number): Observable<any> {
    return this.http.post(`${appURL}/comercial/clientes/buscar-cliente`, { id_cliente });
  }

  ActualizarClientes(cliente: any): Observable<any> {
    return this.http.post(
      `${appURL}/comercial/clientes/actualizar-clientes`, cliente
    );
  }

  UtilidadesRegistrarCotizacion(): Observable<any> {
    return this.http.get(
      `${appURL}/comercial/cotizaciones/utilidades-registrar-cotizacion`
    );
  }

  RegistrarCotizacion(cotizacion: CotizacionesModel, curvas: Array<CotizacionesCurvaModel>, filename: any): Observable<any> {
    return this.http.post(
      `${appURL}/comercial/cotizaciones/registrar-cotizacion`,
      { cotizacion, curvas, filename }
    );
  }

  ListarCotizaciones(): Observable<any> {
    return this.http.get(`${appURL}/comercial/cotizaciones/listar-cotizaciones`);
  }

  BuscarCotizacionFTPorId(id: number): Observable<any> {
    return this.http.post(`${appURL}/comercial/cotizaciones/buscar-cotizacion-ft-por-id`, { id });
  }

  BuscarCotizacionTextilPorId(id: number): Observable<any> {
    return this.http.post(`${appURL}/comercial/cotizaciones/buscar-cotizacion-textil-por-id`, { id });
  }

  BuscarCotizacionPorId(id: number): Observable<any> {
    return this.http.post(`${appURL}/comercial/cotizaciones/buscar-cotizacion-por-id`, { id })
  }

  BuscarCotizacionFTConsumoPorId(id: number): Observable<any> {
    return this.http.post(`${appURL}/comercial/cotizaciones/buscar-cotizacion-ft-consumo-por-id`, { id });
  }

  RegistrarFTHojaCotizacion(
    cotizacion: CotizacionesModel,
    hojaCotizacion: CotizacionesFTHojaCotizacionModel,
    imagenes: any,
    rutas: Array<CotizacionesFTHojaCotizacionRutasModel>,
    avios: Array<CotizacionesFTHojaCotizacionAviosModel>,
    secuencias: Array<CotizacionesFTHojaCotizacionSecuenciasModel>
  ): Observable<any> {
    return this.http.post(
      `${appURL}/comercial/cotizaciones/registrar-ft-hoja-cotizacion`,
      { cotizacion, hojaCotizacion, imagenes, rutas, avios, secuencias }
    );
  }

  RegistrarFTHojaConsumo(
    hojaConsumo: CotizacionesFTHojaConsumoModel, 
    imagen: any,
    textiles: Array<CotizacionesTextilModel>): Observable<any> {
    return this.http.post(
      `${appURL}/comercial/cotizaciones/registrar-ft-hoja-consumo`, 
      { hojaConsumo, imagen, textiles}
    );
  }

  RegistrarFichaTextil(textil: CotizacionesTextilModel): Observable<any> {
    return this.http.post(
      `${appURL}/comercial/cotizaciones/registrar-ficha-textil`, textil
    );
  }

  RegistrarHojaMinutos(hojaMinutos: HojaMinutosModel): Observable<any> {
    return this.http.post(
      `${appURL}/comercial/cotizaciones/registrar-hoja-minutos`, hojaMinutos
    );
  }

  RegistrarHojaMinutosOperaciones(
    hojaOperaciones: HojaMinutosOperacionesModel[]
  ): Observable<any> {
    return this.http.post(`${appURL}/comercial/cotizaciones/registrar-hoja-minutos-operaciones`, hojaOperaciones);
  }

  ListarHojaMinutos(id: number): Observable<any> {
    return this.http.post(`${appURL}/comercial/cotizaciones/listar-hoja-minutos`, { id });
  }

  ListarHojaMinutosOperaciones(id: number): Observable<any> {
    return this.http.post(`${appURL}/comercial/cotizaciones/listar-hoja-minutos-operaciones`, { id });
  }

  ListarMaquinasOperaciones(): Observable<any> {
    return this.http.get(`${appURL}/comercial/cotizaciones/listar-maquinas-operaciones`);
  }
}
