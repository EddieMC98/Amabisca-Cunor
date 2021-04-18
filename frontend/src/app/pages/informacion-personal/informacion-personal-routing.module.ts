import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DireccionEnvioComponent } from './direccion-envio/direccion-envio.component';
import { InformacionPersonalComponent } from './informacion-personal.component';
import { InfoPersonalEditComponent } from './perfil/info-personal-edit.component';
import { PerfilEditComponent } from './perfil/perfil-edit.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: "",
    component: InformacionPersonalComponent,
    children: [
      {
        path: "perfil",
        component: PerfilComponent,
      },
      {
        path: "direccion-envio",
        component: DireccionEnvioComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformacionPersonalRoutingModule { }

export const routedComponents = [
  PerfilComponent,
  PerfilEditComponent,
  InfoPersonalEditComponent,
  DireccionEnvioComponent,
];