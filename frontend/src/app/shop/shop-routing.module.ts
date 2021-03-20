import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShopComponent } from './shop.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [{
  path: '',
  component: ShopComponent,
  children: [
    {path: 'inicio',    component: InicioComponent},
    {
      path: '',
      redirectTo: 'inicio',
      pathMatch: 'full',
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {
}
