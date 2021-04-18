import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "seguridad",
        loadChildren: "./seguridad/seguridad.module#SeguridadModule",
      },
      {
        path: "productos",
        loadChildren: "./productos/productos.module#ProductosModule",
      },
      {
        path: "tipoenvio",
        loadChildren: "./tipo-envio/tipo-envio.module#TipoEnvioModule",
      },
      {
        path: "tipo-usuario",
        loadChildren: "./tipo-usuario/tipo-usuario.module#TipoUsuarioModule",
      },
      {
        path: "catalogo",
        loadChildren: "./catalogo/catalogo.module#CatalogoModule",
      },
      {
        path: "carrito-compras",
        loadChildren:
          "./carrito-compras/carrito-compras.module#CarritoComprasModule",
      },
      {
        path: "informacion-personal",
        loadChildren:
          "./informacion-personal/informacion-personal.module#InformacionPersonalModule",
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
