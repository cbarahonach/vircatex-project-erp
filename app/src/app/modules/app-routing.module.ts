import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/middlewares/auth.guard';
import { LoginComponent } from '../components/auth/login/login.component';
import { HomeComponent } from '../components/layout/home/home.component';
import { PagenotfoundComponent } from '../components/layout/pagenotfound/pagenotfound.component';
import { PerfilComponent } from '../components/auth/perfil/perfil.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PagenotfoundComponent,
    canActivate: [AuthGuard]
  },
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
