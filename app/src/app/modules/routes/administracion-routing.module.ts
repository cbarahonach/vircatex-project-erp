import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { AuthGuard } from "src/app/services/middlewares/auth.guard";
import { AdministracionComponent } from "src/app/components/modules/administracion/administracion.component";
import { AsistenciasComponent } from "src/app/components/modules/administracion/asistencias/asistencias.component";
import { RegistrarPersonalComponent } from "src/app/components/modules/administracion/registrar-personal/registrar-personal.component";
import { DetallePersonalComponent } from "src/app/components/modules/administracion/detalle-personal/detalle-personal.component";

const routes: Routes = [
  {
    path: "Administracion",
    component: AdministracionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "Administracion/asistencias",
    component: AsistenciasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "Administracion/registrar-personal",
    component: RegistrarPersonalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "Administracion/detalle-personal/:id",
    component: DetallePersonalComponent,
    canActivate: [AuthGuard]
  }
];

const routesLazzy: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [routesLazzy],
  providers: [],
  exports: []
})
export class AdministracionRoutingModule {}
