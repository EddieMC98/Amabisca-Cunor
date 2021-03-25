import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaisComponent } from './pais/pais.component';
import { TipoUsuarioComponent } from './tipo-usuario.component';

const routes: Routes = [{
  path: '',
  component: TipoUsuarioComponent,
  children: [{
    path: 'pais',
    component: PaisComponent,
  },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoUsuarioRoutingModule { }

export const routedComponents = [
  PaisComponent,
];
