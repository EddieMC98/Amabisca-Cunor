import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TipoEnvioComponent } from "./tipo-envio/tipo-envio.component";

const routes: Routes = [
  {
    path: '',
    component: TipoEnvioComponent,
    children: [
      {
        path: 'tipoenvio',
        component: TipoEnvioComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoEnvioRoutingModule {}
export const routedComponents = [TipoEnvioComponent];
