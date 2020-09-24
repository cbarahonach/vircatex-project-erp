import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PersonalModel } from "../models/personal.model";
import { Observable } from "rxjs";
import { appURL } from "../app.uri";

@Injectable({
  providedIn: "root"
})
export class AdministracionService {
  constructor(private http: HttpClient) {}

  RegistrarPersonal(personal: PersonalModel): Observable<any> {
    return this.http.post(
      `${appURL}/administracion/personal/registrar-personal`,
      personal
    );
  }

  ListarPersonal(): Observable<any> {
    return this.http.get(`${appURL}/administracion/personal/listar-personal`);
  }

  EliminarPersonal(id: any): Observable<any> {
    return this.http.post(
      `${appURL}/administracion/personal/eliminar-personal`,
      id
    );
  }

  BuscarPersonal(id: number): Observable<any> {
    return this.http.post(`${appURL}/administracion/personal/buscar-personal`, {
      id_personal: id
    });
  }

  ActualizarPersonal(personal: any): Observable<any> {
    return this.http.post(
      `${appURL}/administracion/personal/actualizar-personal`,
      personal
    );
  }

  RegistrarAsistencias(asistencias: any): Observable<any> {
    return this.http.post(
      `${appURL}/administracion/asistencias/registrar-asistencias`,
      asistencias
    );
  }

  ListarAsistencias(): Observable<any> {
    return this.http.get(
      `${appURL}/administracion/asistencias/listar-asistencias`
    );
  }
}
