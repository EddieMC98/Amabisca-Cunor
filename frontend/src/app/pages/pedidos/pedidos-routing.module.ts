import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexClienteComponent } from './index-cliente/index-cliente.component';
import { IndexComponent } from './index/index.component';
import { PedidosComponent } from './pedidos.component';

const routes: Routes = [
  {
    path: "",
    component: PedidosComponent,
    children: [
      {
        path: "index",
        component: IndexComponent,
      },
      {
        path: "index-cliente",
        component: IndexClienteComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
export const routedComponents = [IndexComponent, IndexClienteComponent];