import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeguridadComponent } from './seguridad.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RolesComponent } from './roles/roles.component';
import { PermisosComponent } from './roles/permisos.component';

const routes: Routes = [{
  path: '',
  component: SeguridadComponent,
  children: [{
    path: 'usuarios',
    component: UsuariosComponent,
  },
  {
    path: 'roles',
    component: RolesComponent,
  },
  {
    path: 'permisos/:id',
    component: PermisosComponent,
  }],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class SeguridadRoutingModule {

}

export const routedComponents = [
  SeguridadComponent,
  UsuariosComponent,
  RolesComponent,
  PermisosComponent,
];
