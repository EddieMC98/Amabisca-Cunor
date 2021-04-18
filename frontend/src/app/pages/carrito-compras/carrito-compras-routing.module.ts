import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CarritoComprasComponent } from "./carrito-compras.component";
import { IndexComponent } from "./index/index.component";

const routes: Routes = [
  {
    path: "",
    component: CarritoComprasComponent,
    children: [
      {
        path: "index",
        component: IndexComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarritoComprasRoutingModule {}

export const routedComponents = [IndexComponent];
