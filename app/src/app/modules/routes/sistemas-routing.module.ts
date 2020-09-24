import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from 'src/app/services/middlewares/auth.guard';
import { SistemaComponent } from 'src/app/components/modules/sistema/sistema.component';
import { RegistrarUsuarioComponent } from 'src/app/components/modules/sistema/registrar-usuario/registrar-usuario.component';
import { RegistrarModuloComponent } from 'src/app/components/modules/sistema/registrar-modulo/registrar-modulo.component';
import { RegistrarAccesoComponent } from 'src/app/components/modules/sistema/registrar-acceso/registrar-acceso.component';
import { AdminGuard } from 'src/app/services/middlewares/admin.guard';

const routes: Routes = [
    {
        path: 'Sistemas',
        component: SistemaComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'Sistemas/registrar-usuario',
        component: RegistrarUsuarioComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'Sistemas/registrar-modulo',
        component: RegistrarModuloComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'Sistemas/registrar-acceso',
        component: RegistrarAccesoComponent,
        canActivate: [AuthGuard, AdminGuard]
    },

];

const routesLazzy: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
    imports: [
        routesLazzy
    ],
    providers: [],
    exports: []
})

export class SistemasRoutingModule { }