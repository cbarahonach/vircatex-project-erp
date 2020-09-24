import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { appURL } from "../app.uri";
import { UsuariosModel } from "../models/usuarios.model";
import { ModulosModel } from "../models/modulos.model";
import { ModulosRutasModel } from "../models/modulosRutas.model";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(private http: HttpClient) {}

  DetallesSistema(): Observable<any> {
    return this.http.get(`${appURL}/admin/configuracion/detalles`);
  }

  ListarModulosDisponibles(): Observable<any> {
    return this.http.get(`${appURL}/admin/modulos/listar-modulos-disponibles`);
  }

  ListarRoles(): Observable<any> {
    return this.http.get(`${appURL}/admin/roles/listar-roles`);
  }

  ListarRolesRegistradas(): Observable<any> {
    return this.http.get(`${appURL}/admin/roles/listar-roles-registrados`);
  }

  RegistrarUsuario(usuario: UsuariosModel): Observable<any> {
    return this.http.post(
      `${appURL}/admin/usuarios/registrar-usuario`,
      usuario
    );
  }

  ListarUsuarios(): Observable<any> {
    return this.http.get(`${appURL}/admin/usuarios/listar-usuarios`);
  }

  ListarModulos(): Observable<any> {
    return this.http.get(`${appURL}/admin/modulos/listar-modulos`);
  }

  RegistrarModulo(modulo: ModulosModel): Observable<any> {
    return this.http.post(`${appURL}/admin/modulos/registrar-modulo`, modulo);
  }

  ListarRutas(): Observable<any> {
    return this.http.get(`${appURL}/admin/modulos/listar-rutas`);
  }

  RegistarRutas(ruta: ModulosRutasModel): Observable<any> {
    return this.http.post(`${appURL}/admin/modulos/registrar-ruta`, ruta);
  }

  RegistrarRolesAccesos(body: any): Observable<any> {
    return this.http.post(
      `${appURL}/admin/roles/registrar-roles-accesos`,
      body
    );
  }
}
