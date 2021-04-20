import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { TipoCambioComponent } from './tipo-cambio.component';

const routes: Routes = [
  {
    path: "",
    component: TipoCambioComponent,
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
  exports: [RouterModule]
})
export class TipoCambioRoutingModule { }
export const routedComponents = [IndexComponent];