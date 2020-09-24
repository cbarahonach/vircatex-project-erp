import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "../components/auth/login/login.component";
import { HomeComponent } from "../components/layout/home/home.component";
import { PagenotfoundComponent } from "../components/layout/pagenotfound/pagenotfound.component";
import { ComercialComponent } from "../components/modules/comercial/comercial.component";
import { MaterialModule } from "./material.module";
import { ErrorInterceptor } from "../_helpers/error.interceptor";
import { JwtInterceptor } from "../_helpers/jwt.interceptor";
import { AuthService } from "../services/auth.service";
import { TokenService } from "../services/token.service";
import { AdminService } from "../services/admin.service";
import { BreadcrumbComponent } from "../components/layout/breadcrumb/breadcrumb.component";
import { SolicitudCotizacionComponent } from "../components/modules/comercial/solicitud-cotizacion/solicitud-cotizacion.component";
import { ComercialService } from "../services/comercial.service";
import { ListadoClientesComponent } from "../components/modules/comercial/listado-clientes/listado-clientes.component";
import { RegistrarClientesComponent } from "../components/modules/comercial/registrar-clientes/registrar-clientes.component";
import { DetalleClienteComponent } from "../components/modules/comercial/listado-clientes/detalle-cliente/detalle-cliente.component";
import { ExternoComponent } from "../components/modules/externo/externo.component";
import { TblReporteTextilComponent } from "../components/modules/externo/reporte-textil/tbl-reporte-textil/tbl-reporte-textil.component";
import { ReporteTextilComponent } from "../components/modules/externo/reporte-textil/reporte-textil.component";
import { UploadReporteTextilComponent } from "../components/modules/externo/reporte-textil/upload-reporte-textil/upload-reporte-textil.component";
import { ModalReporteTextilComponent } from "../components/modules/externo/reporte-textil/modal-reporte-textil/modal-reporte-textil.component";
import { ReporteManufacturaComponent } from "../components/modules/externo/reporte-manufactura/reporte-manufactura.component";
import { ModalSolicitudCotizacionComponent } from "../components/modules/comercial/solicitud-cotizacion/modal-solicitud-cotizacion/modal-solicitud-cotizacion.component";
import { EjecucionCotizacionComponent } from "../components/modules/comercial/ejecucion-cotizacion/ejecucion-cotizacion.component";
import { HojaCotizacionComponent } from "../components/modules/comercial/ejecucion-cotizacion/ficha-tecnica/hoja-cotizacion/hoja-cotizacion.component";
import { HojaConsumosComponent } from "../components/modules/comercial/ejecucion-cotizacion/ficha-tecnica/hoja-consumos/hoja-consumos.component";
import { FichaTecnicaComponent } from "../components/modules/comercial/ejecucion-cotizacion/ficha-tecnica/ficha-tecnica.component";
import { ButtonScrollYComponent } from "../components/layout/button-scroll-y/button-scroll-y.component";
import { ModalHojaCotizacionRutasComponent } from "../components/modules/comercial/ejecucion-cotizacion/ficha-tecnica/hoja-cotizacion/modal-hoja-cotizacion-rutas/modal-hoja-cotizacion-rutas.component";
import { ModalHojaCotizacionImgComponent } from "../components/modules/comercial/ejecucion-cotizacion/ficha-tecnica/hoja-cotizacion/modal-hoja-cotizacion-img/modal-hoja-cotizacion-img.component";
import { ModalHojaCotizacionSecuenciasComponent } from "../components/modules/comercial/ejecucion-cotizacion/ficha-tecnica/hoja-cotizacion/modal-hoja-cotizacion-secuencias/modal-hoja-cotizacion-secuencias.component";
import { ModalHojaCotizacionAviosComponent } from "../components/modules/comercial/ejecucion-cotizacion/ficha-tecnica/hoja-cotizacion/modal-hoja-cotizacion-avios/modal-hoja-cotizacion-avios.component";
import { ModalHojaConsumosTallasComponent } from "../components/modules/comercial/ejecucion-cotizacion/ficha-tecnica/hoja-consumos/modal-hoja-consumos-tallas/modal-hoja-consumos-tallas.component";
import { ModalHojaConsumosCorteComponent } from "../components/modules/comercial/ejecucion-cotizacion/ficha-tecnica/hoja-consumos/modal-hoja-consumos-corte/modal-hoja-consumos-corte.component";
import { FichaTextilComponent } from "../components/modules/comercial/ejecucion-cotizacion/ficha-textil/ficha-textil.component";
import { ExporterService } from "../services/exporter.service";
import { TblReporteClienteManufacturaComponent } from "../components/modules/externo/reporte-manufactura/tbl-reporte-cliente-manufactura/tbl-reporte-cliente-manufactura.component";
import { TblInfoManufacturaComponent } from "../components/modules/externo/reporte-manufactura/tbl-info-manufactura/tbl-info-manufactura.component";
import { FrmReporteManufacturaComponent } from "../components/modules/externo/reporte-manufactura/frm-reporte-manufactura/frm-reporte-manufactura.component";
import { ModalReporteManufacturaComponent } from "../components/modules/externo/reporte-manufactura/modal-reporte-manufactura/modal-reporte-manufactura.component";
import { FrmRegistrarUsuarioComponent } from "../components/modules/sistema/registrar-usuario/frm-registrar-usuario/frm-registrar-usuario.component";
import { TblRegistrarUsuarioComponent } from "../components/modules/sistema/registrar-usuario/tbl-registrar-usuario/tbl-registrar-usuario.component";
import { TblRegistrarModuloComponent } from "../components/modules/sistema/registrar-modulo/tbl-registrar-modulo/tbl-registrar-modulo.component";
import { FrmRegistrarModuloComponent } from "../components/modules/sistema/registrar-modulo/frm-registrar-modulo/frm-registrar-modulo.component";
import { FrmRegistrarAccesoComponent } from "../components/modules/sistema/registrar-acceso/frm-registrar-acceso/frm-registrar-acceso.component";
import { TblRegistrarAccesoComponent } from "../components/modules/sistema/registrar-acceso/tbl-registrar-acceso/tbl-registrar-acceso.component";
import { RegistrarAccesoComponent } from "../components/modules/sistema/registrar-acceso/registrar-acceso.component";
import { SistemaComponent } from "../components/modules/sistema/sistema.component";
import { RegistrarModuloComponent } from "../components/modules/sistema/registrar-modulo/registrar-modulo.component";
import { RegistrarUsuarioComponent } from "../components/modules/sistema/registrar-usuario/registrar-usuario.component";
import { HojaMinutosComponent } from "../components/modules/comercial/ejecucion-cotizacion/ficha-tecnica/hoja-minutos/hoja-minutos.component";
import { ModalEstimacionesComponent } from "../components/modules/comercial/ejecucion-cotizacion/ficha-tecnica/hoja-minutos/modal-estimaciones/modal-estimaciones.component";
import { ModalOperacionesComponent } from "../components/modules/comercial/ejecucion-cotizacion/ficha-tecnica/hoja-minutos/modal-operaciones/modal-operaciones.component";
import { PerfilComponent } from "../components/auth/perfil/perfil.component";
import { ModalMaquinasComponent } from "../components/modules/comercial/ejecucion-cotizacion/ficha-tecnica/hoja-minutos/modal-maquinas/modal-maquinas.component";
import { AdministracionComponent } from "../components/modules/administracion/administracion.component";
import { AsistenciasComponent } from "../components/modules/administracion/asistencias/asistencias.component";
import { RegistrarPersonalComponent } from "../components/modules/administracion/registrar-personal/registrar-personal.component";
import { FrmRegistrarPersonalComponent } from "../components/modules/administracion/registrar-personal/frm-registrar-personal/frm-registrar-personal.component";
import { TblRegistrarPersonalComponent } from "../components/modules/administracion/registrar-personal/tbl-registrar-personal/tbl-registrar-personal.component";
import { AdministracionService } from "../services/administracion.service";
import { DetallePersonalComponent } from "../components/modules/administracion/detalle-personal/detalle-personal.component";
import { ModalResumenComponent } from "../components/modules/comercial/ejecucion-cotizacion/ficha-tecnica/hoja-minutos/modal-resumen/modal-resumen.component";
import { LogisticaComponent } from '../components/modules/logistica/logistica.component';
import { RegistrarOrdenCompraComponent } from '../components/modules/logistica/registrar-orden-compra/registrar-orden-compra.component';
import { RegistrarProveedorComponent } from '../components/modules/logistica/registrar-proveedor/registrar-proveedor.component';
import { LogisticaService } from '../services/logistica.service';
import { ModalOrdenCompraItemsComponent } from '../components/modules/logistica/registrar-orden-compra/modal-orden-compra-items/modal-orden-compra-items.component';
import { ListadoOrdenCompraComponent } from '../components/modules/logistica/listado-orden-compra/listado-orden-compra.component';
import { ListadoProveedoresComponent } from '../components/modules/logistica/listado-proveedores/listado-proveedores.component';
import { EditarProveedorComponent } from '../components/modules/logistica/editar-proveedor/editar-proveedor.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    ModalReporteTextilComponent,
    ModalSolicitudCotizacionComponent,
    ModalHojaCotizacionRutasComponent,
    ModalHojaCotizacionImgComponent,
    ModalHojaCotizacionSecuenciasComponent,
    ModalHojaCotizacionAviosComponent,
    ModalHojaConsumosTallasComponent,
    ModalHojaConsumosCorteComponent,
    ModalReporteManufacturaComponent,
    ModalEstimacionesComponent,
    ModalOperacionesComponent,
    ModalMaquinasComponent,
    ModalResumenComponent,
    ModalOrdenCompraItemsComponent
  ],
  declarations: [
    LoginComponent,
    HomeComponent,
    PagenotfoundComponent,
    BreadcrumbComponent,
    ComercialComponent,
    SolicitudCotizacionComponent,
    ListadoClientesComponent,
    RegistrarClientesComponent,
    DetalleClienteComponent,
    ExternoComponent,
    TblReporteTextilComponent,
    ReporteTextilComponent,
    UploadReporteTextilComponent,
    ModalReporteTextilComponent,
    ReporteManufacturaComponent,
    ModalSolicitudCotizacionComponent,
    EjecucionCotizacionComponent,
    HojaCotizacionComponent,
    HojaConsumosComponent,
    FichaTecnicaComponent,
    ButtonScrollYComponent,
    ModalHojaCotizacionRutasComponent,
    ModalHojaCotizacionImgComponent,
    ModalHojaCotizacionSecuenciasComponent,
    ModalHojaCotizacionAviosComponent,
    ModalHojaConsumosTallasComponent,
    ModalHojaConsumosCorteComponent,
    FichaTextilComponent,
    TblReporteClienteManufacturaComponent,
    TblInfoManufacturaComponent,
    FrmReporteManufacturaComponent,
    ModalReporteManufacturaComponent,
    FrmRegistrarUsuarioComponent,
    TblRegistrarUsuarioComponent,
    TblRegistrarModuloComponent,
    FrmRegistrarModuloComponent,
    FrmRegistrarAccesoComponent,
    TblRegistrarAccesoComponent,
    RegistrarAccesoComponent,
    SistemaComponent,
    RegistrarModuloComponent,
    RegistrarUsuarioComponent,
    HojaMinutosComponent,
    ModalEstimacionesComponent,
    ModalOperacionesComponent,
    PerfilComponent,
    ModalMaquinasComponent,
    AdministracionComponent,
    AsistenciasComponent,
    RegistrarPersonalComponent,
    FrmRegistrarPersonalComponent,
    TblRegistrarPersonalComponent,
    DetallePersonalComponent,
    ModalResumenComponent,
    LogisticaComponent,
    RegistrarOrdenCompraComponent,
    RegistrarProveedorComponent,
    ModalOrdenCompraItemsComponent,
    ListadoOrdenCompraComponent,
    ListadoProveedoresComponent,
    EditarProveedorComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    TokenService,
    AuthService,
    AdminService,
    ComercialService,
    ExporterService,
    AdministracionService,
    LogisticaService
  ]
})
export class ImportsModule {}
