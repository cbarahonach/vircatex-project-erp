import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { ComercialComponent } from "src/app/components/modules/comercial/comercial.component";
import { AuthGuard } from "src/app/services/middlewares/auth.guard";
import { ComercialGuard } from "src/app/services/middlewares/comercial.guard";
import { RegistrarClientesComponent } from "src/app/components/modules/comercial/registrar-clientes/registrar-clientes.component";
import { SolicitudCotizacionComponent } from "src/app/components/modules/comercial/solicitud-cotizacion/solicitud-cotizacion.component";
import { EjecucionCotizacionComponent } from "src/app/components/modules/comercial/ejecucion-cotizacion/ejecucion-cotizacion.component";
import { DetalleClienteComponent } from "src/app/components/modules/comercial/listado-clientes/detalle-cliente/detalle-cliente.component";
import { FichaTecnicaComponent } from "src/app/components/modules/comercial/ejecucion-cotizacion/ficha-tecnica/ficha-tecnica.component";
import { FichaTextilComponent } from "src/app/components/modules/comercial/ejecucion-cotizacion/ficha-textil/ficha-textil.component";
import { ListadoClientesComponent } from 'src/app/components/modules/comercial/listado-clientes/listado-clientes.component';

const routes: Routes = [
  {
    path: "Comercial",
    component: ComercialComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "Comercial/registrar-cliente",
    component: RegistrarClientesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "Comercial/listado-clientes",
    component: ListadoClientesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "Comercial/solicitud-cotizacion",
    component: SolicitudCotizacionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "Comercial/ejecucion-cotizacion",
    component: EjecucionCotizacionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "Comercial/detalle-cliente/:id",
    component: DetalleClienteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "Comercial/ejecucion-cotizacion/ficha-tecnica/:id",
    component: FichaTecnicaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "Comercial/ejecucion-cotizacion/ficha-textil/:id",
    component: FichaTextilComponent,
    canActivate: [AuthGuard]
  }
];

const routesLazzy: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [routesLazzy],
  providers: [],
  exports: []
})
export class ComercialRoutingModule {}
