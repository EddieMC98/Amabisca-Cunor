import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent,
  },{
    path: 'operaciones',
    loadChildren: './operaciones/operaciones.module#OperacionesModule',
  }, {
    path: 'reportes',
    loadChildren: './reportes/reportes.module#ReportesModule',
  }
  , {
    path: 'catalogos',
    loadChildren: './catalogos/catalogos.module#CatalogosModule',
  }, {
    path: 'seguridad',
    loadChildren: './seguridad/seguridad.module#SeguridadModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
