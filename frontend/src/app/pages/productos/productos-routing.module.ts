import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { MarcaComponent } from './marca/marca.component';
import { ProductoComponent } from './producto.component';
import { UnidadMedidaComponent } from './unidadmedida/unidad-medida.component';

const routes: Routes = [{
  path: '',
  component: ProductoComponent,
  children: [{
    path: 'marca',
    component: MarcaComponent,
  },
  {
    path: 'categoria',
    component: CategoriaComponent,
  },
  {
    path: 'unidadmedida',
    component: UnidadMedidaComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }


export const routedComponents = [
  MarcaComponent,
  CategoriaComponent,
  UnidadMedidaComponent,
];
