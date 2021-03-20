import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogosComponent } from './catalogos.component';
import { TipoSangreComponent } from './tipo-sangre/tipo-sangre.component';
import { TipoDescarteComponent } from './tipo-descarte/tipo-descarte.component';
import { TipoDonacionComponent } from './tipo-donacion/tipo-donacion.component';
import { TipoMotivoComponent } from './tipo-motivo/tipo-motivo.component';
import { TipoPredonacionComponent } from './tipo-predonacion/tipo-predonacion.component';
import { TipoSerologiaComponent } from './tipo-serologia/tipo-serologia.component';
import { TipoTransfusionComponent } from './tipo-transfusion/tipo-transfusion.component';
import { TipoServicioComponent } from './tipo-servicio/tipo-servicio.component';
import { GrupoEtnicoComponent } from './grupo-etnico/grupo-etnico.component';

const routes: Routes = [{
  path: '',
  component: CatalogosComponent,
  children: [
    {
      path: 'tipo-sangre',
      component: TipoSangreComponent,
    },
    {
      path: 'tipo-descarte',
      component: TipoDescarteComponent,
    },
    {
      path: 'tipo-donacion',
      component: TipoDonacionComponent,
    },
    {
      path:'tipo-motivo',
      component: TipoMotivoComponent,
    },
    {
      path:'tipo-predonacion',
      component: TipoPredonacionComponent,
    },
    {
      path:'tipo-serologia',
      component: TipoSerologiaComponent,
    },
    {
      path:'tipo-transfusion',
      component: TipoTransfusionComponent,
    },
    {
      path:'tipo-servicio',
      component: TipoServicioComponent,
    },
    {
      path:'grupo-etnico',
      component: GrupoEtnicoComponent,
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
export class CatalogosRoutingModule {

}

export const routedComponents = [
  CatalogosComponent,
  TipoSangreComponent,
  TipoDescarteComponent,
  TipoDonacionComponent,
  TipoMotivoComponent,
  TipoSerologiaComponent,
  TipoTransfusionComponent,
  TipoServicioComponent,
  GrupoEtnicoComponent,
];
