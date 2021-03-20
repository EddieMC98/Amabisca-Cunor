import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperacionesComponent } from './operaciones.component';
import { TransNoUtilizadaComponent } from './trans-no-utilizada/trans-no-utilizada.component';
import { UnidadDescartadaComponent } from './unidad-descartada/unidad-descartada.component';
import { DonacionExternaComponent } from './donacion-externa/donacion-externa.component';
import { DonacionComponent } from './donacion/donacion.component';
import { DonacionNuevoComponent } from './donacion/donacion-nuevo.component';
import { DonacionVerComponent } from './donacion/donacion-ver.component';
import { TransfusionComponent } from './transfusion/transfusion.component';
import { TransfusionNuevoComponent } from './transfusion/transfusion-nuevo.component';
import { TransfusionVerComponent } from './transfusion/transfusion-ver.component';
import { PersonasComponent } from './personas/personas.component';
import { PruebasSerologiaComponent } from './pruebas-serologia/pruebas-serologia.component';
import { PruebasSerologiaNuevoComponent } from './pruebas-serologia/pruebas-serologia-nuevo.component';
import { PruebasSerologiaVerComponent } from './pruebas-serologia/pruebas-serologia-ver.component';
import { FraccionamientoComponent } from './fraccionamiento/fraccionamiento.component';
import { IntercambioComponent } from './intercambio/intercambio.component';

const routes: Routes = [{
  path: '',
  component: OperacionesComponent,
  children: [
    {
      path:'trans-no-utilizada',
      component: TransNoUtilizadaComponent,
    },
    {
      path:'unidad-descartada',
      component: UnidadDescartadaComponent,
    },
    {
      path:'donacion-externa',
      component: DonacionExternaComponent,
    },
    {
      path:'donacion',
      component: DonacionComponent,
    },
    {
      path:'donacion/nuevo',
      component: DonacionNuevoComponent,
    },
    {
      path: 'donacion/ver/:id',
      component: DonacionVerComponent,
    },
    {
      path:'transfusion',
      component: TransfusionComponent,
    },
    {
      path:'transfusion/nuevo',
      component: TransfusionNuevoComponent,
    },
    {
      path: 'transfusion/ver/:id',
      component: TransfusionVerComponent,
    },
    {
      path:'personas',
      component: PersonasComponent,
    },
    {
      path:'pruebas-serologia',
      component: PruebasSerologiaComponent,
    },
    {
      path:'pruebas-serologia/nuevo',
      component: PruebasSerologiaNuevoComponent,
    },
    {
      path: 'pruebas-serologia/ver/:id',
      component: PruebasSerologiaVerComponent,
    },
    {
      path: 'fraccionamiento',
      component: FraccionamientoComponent,
    },
    {
      path: 'intercambio',
      component: IntercambioComponent,
    },
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
export class OperacionesRoutingModule {

}

export const routedComponents = [
  OperacionesComponent,
  TransNoUtilizadaComponent,
  UnidadDescartadaComponent,
  DonacionExternaComponent,
  DonacionComponent,
  DonacionNuevoComponent,
  DonacionVerComponent,
  TransfusionComponent,
  TransfusionNuevoComponent,
  TransfusionVerComponent,
  PruebasSerologiaNuevoComponent,
  PruebasSerologiaComponent,
  PruebasSerologiaVerComponent,
  IntercambioComponent,
];
