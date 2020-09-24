import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { AuthGuard } from "src/app/services/middlewares/auth.guard";
import { LogisticaComponent } from 'src/app/components/modules/logistica/logistica.component';
import { LogisticaGuard } from 'src/app/services/middlewares/logistica.guard';
import { RegistrarOrdenCompraComponent } from 'src/app/components/modules/logistica/registrar-orden-compra/registrar-orden-compra.component';
import { RegistrarProveedorComponent } from 'src/app/components/modules/logistica/registrar-proveedor/registrar-proveedor.component';
import { ListadoOrdenCompraComponent } from 'src/app/components/modules/logistica/listado-orden-compra/listado-orden-compra.component';
import { ListadoProveedoresComponent } from 'src/app/components/modules/logistica/listado-proveedores/listado-proveedores.component';
import { EditarProveedorComponent } from 'src/app/components/modules/logistica/editar-proveedor/editar-proveedor.component';


const routes: Routes = [
  {
    path: "Logistica",
    component: LogisticaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "Logistica/registrar-orden-compra",
    component: RegistrarOrdenCompraComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "Logistica/registrar-proveedor",
    component: RegistrarProveedorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "Logistica/listado-orden-compra",
    component: ListadoOrdenCompraComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "Logistica/listado-proveedores",
    component: ListadoProveedoresComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "Logistica/editar-proveedor/:id",
    component: EditarProveedorComponent,
    canActivate: [AuthGuard]
  }
];

const routesLazzy: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [routesLazzy],
  providers: [],
  exports: []
})
export class LogisticaRoutingModule { }
