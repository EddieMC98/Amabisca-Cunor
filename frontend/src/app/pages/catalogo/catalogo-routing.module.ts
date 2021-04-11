import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CatalogoComponent } from "./catalogo.component";
import { IndexComponent } from "./index/index.component";

const routes: Routes = [
  {
    path: "",
    component: CatalogoComponent,
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
export class CatalogoRoutingModule {}

export const routedComponents = [IndexComponent];
