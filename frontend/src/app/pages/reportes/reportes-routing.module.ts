import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesComponent } from './reportes.component';
import { Reporte1Component } from './reporte1/reporte1.component';
import { Reporte2Component } from './reporte2/reporte2.component';
import { Reporte3Component } from './reporte3/reporte3.component';
import { Reporte4Component } from './reporte4/reporte4.component';
import { Reporte5Component } from './reporte5/reporte5.component';
const routes: Routes = [{
  path: '',
  component: ReportesComponent,
  children: [
    {
      path: 'reporte1',
      component: Reporte1Component,
    },
    {
      path: 'reporte2',
      component: Reporte2Component,
    },
    {
      path: 'reporte3',
      component: Reporte3Component,
    },
    {
      path: 'reporte4',
      component: Reporte4Component,
    },
    {
      path: 'reporte5',
      component: Reporte5Component,
    }
  ],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ReportesRoutingModule {

}

export const routedComponents = [
  ReportesComponent,
];
