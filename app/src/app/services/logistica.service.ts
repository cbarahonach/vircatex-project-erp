import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { appURL } from "../app.uri";
import { ProveedoresModel } from '../models/proveedores.model';
import { OrdenComprasServiciosModel } from '../models/OrdenComprasServiciosModel.model';
import { OrdenComprasItemsModel } from '../models/ordenComprasItems.model';


@Injectable({
  providedIn: "root"
})
export class LogisticaService {
  constructor(private http: HttpClient) { }

  UtilidadesRegistrarProveedor(): Observable<any> {
    return this.http.get(`${appURL}/logistica/proveedor/utilidades-registrar-proveedor`);
  }

  UtilidadesRegistrarOrden(): Observable<any> {
    return this.http.get(`${appURL}/logistica/documento/utilidades-registrar-orden`);
  }

  RegistrarProveedor(proveedor: ProveedoresModel): Observable<any> {
    return this.http.post(`${appURL}/logistica/proveedor/registrar-proveedor`, proveedor);
  }

  ActualizarProveedor(proveedor: ProveedoresModel): Observable<any> {
    return this.http.post(`${appURL}/logistica/proveedor/actualizar-proveedor`,proveedor);
  }

  ListarProveedores(): Observable<any> {
    return this.http.get(`${appURL}/logistica/proveedor/listar-proveedores`);
  }

   RegistrarOrdenCompra(ordenCompra: OrdenComprasServiciosModel, items: Array<OrdenComprasItemsModel>, proveedor: ProveedoresModel): Observable<any> {
    return this.http.post(`${appURL}/logistica/documento/registrar-orden-compra`, { ordenCompra: ordenCompra, items: items, proveedor : proveedor});
  }


  ListarOrdenes(): Observable<any> {
    return this.http.get(`${appURL}/logistica/documento/listar-ordenes`);
  }

  ListarOrdenCompraPorId(id: number): Observable<any> {
    return this.http.post(`${appURL}/logistica/documento/listar-orden-compra-por-id`, {
      id_orden_compra: id
    });
  }
  ListarOrdenCompraItemPorId(id: number): Observable<any> {
    return this.http.post(`${appURL}/logistica/documento/listar-orden-compra-item-por-id`, {
      id_orden_compra: id
    });
  }
  ListarProveedorPorId(id: number): Observable<any> {
    return this.http.post(`${appURL}/logistica/documento/listar-proveedor-por-id`, {
      proveedor_id: id
    });
  }

  EliminarOrdenCompraId(id: number): Observable<any> {
    return this.http.post(`${appURL}/logistica/documento/eliminar-orden-compra-por-id`, {
      id_orden_compra: id
    });
  }

  EliminarProveedorId(id: number): Observable<any> {
    return this.http.post(`${appURL}/logistica/documento/eliminar-proveedor-por-id`, {
      proveedor_id: id
    });
  }
}

