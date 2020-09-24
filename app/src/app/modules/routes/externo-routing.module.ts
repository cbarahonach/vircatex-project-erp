import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from 'src/app/services/middlewares/auth.guard';
import { ExternoComponent } from 'src/app/components/modules/externo/externo.component';
import { ReporteTextilComponent } from 'src/app/components/modules/externo/reporte-textil/reporte-textil.component';
import { ReporteManufacturaComponent } from 'src/app/components/modules/externo/reporte-manufactura/reporte-manufactura.component';
import { TblInfoManufacturaComponent } from 'src/app/components/modules/externo/reporte-manufactura/tbl-info-manufactura/tbl-info-manufactura.component';

const routes: Routes = [
    {
        path: 'Externo',
        component: ExternoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'Externo/reporte-textil',
        component: ReporteTextilComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'Externo/reporte-manufactura',
        component: ReporteManufacturaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'Externo/reporte-manufactura/:id',
        component: TblInfoManufacturaComponent,
        canActivate: [AuthGuard]
    }
];

const routesLazzy: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
    imports: [
        routesLazzy
    ],
    providers: [],
    exports: []
})

export class ExternoRoutingModule { }