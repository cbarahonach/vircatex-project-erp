import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appURL } from '../app.uri';
import { ReporteTextilModel } from '../models/reportesTextil.model';

@Injectable({
  providedIn: 'root'
})
export class ExternoService {

  constructor(private http: HttpClient) { }

  RegistrarReporteTextil(reportes: ReporteTextilModel[]): Observable<any> {
    return this.http.post(`${appURL}/externo/reportes/registrar-reporte-textil`, reportes);
  }

  ListarReporteTextil(): Observable<any> {
    return this.http.get(`${appURL}/externo/reportes/listar-reporte-textil`);
  }

  ActualizarReporteTextil(reporte: ReporteTextilModel): Observable<any> {
    return this.http.post(`${appURL}/externo/reportes/actualizar-reporte-textil`, reporte);
  }

  EliminarReporteTextil(reporteId: number): Observable<any> {
    return this.http.post(`${appURL}/externo/reportes/eliminar-reporte-textil-por-id`, { reporteId });
  }

  RegistrarReporteManufactura(reportes: any): Observable<any> {
    return this.http.post(`${appURL}/externo/reportes/registrar-reporte-manufactura`, reportes);
  }

  ListarReporteManufactura(): Observable<any> {
    return this.http.get(`${appURL}/externo/reportes/listar-reporte-manufactura`);
  }

  BuscarReporteManufactura(reporte: any): Observable<any> {
    return this.http.post(`${appURL}/externo/reportes/buscar-reporte-por-id`, reporte);
  }

  ActualizarReporteManufactura(reportes: any): Observable<any> {
    return this.http.post(`${appURL}/externo/reportes/actualizar-reporte-manufactura`, reportes);
  }

  EliminarReporteManufatura(reportesId: number): Observable<any> {
    return this.http.post(`${appURL}/externo/reportes/eliminar-reporte-manufactura-por-id`, { reportesId });
  }

}
