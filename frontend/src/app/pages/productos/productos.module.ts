import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  ProductosRoutingModule,
  routedComponents,
} from "./productos-routing.module";
import { MarcaModalComponent } from "./marca/marca-modal.component";
import { MarcaComponent } from "./marca/marca.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from "../../@theme/theme.module";
import { ToasterModule, ToasterService } from "angular2-toaster";
import { DatePipe } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NbAuthJWTInterceptor } from "@nebular/auth";
import { MarcaService } from "../../@core/data/marca.service";
import { ProductoComponent } from "./producto.component";
import { CategoriaComponent } from "./categoria/categoria.component";
import { CategoriasModalComponent } from "./categoria/categorias-modal.component";
import { CategoriaService } from "../../@core/data/categoria.service";
import { UnidadMedidaComponent } from "./unidadmedida/unidad-medida.component";
import { UnidadMedidaModalComponent } from "./unidadmedida/unidad-medida-modal.component";
import { UnidadMedidaService } from "../../@core/data/unidad-medida.service";
import { InventarioComponent } from "./inventario/inventario.component";
import { InventarioModalComponent } from "./inventario/inventario-modal.component";
import { InventarioService } from "../../@core/data/inventario.service";
import { CProductoComponent } from "./producto/cproducto.component";
import { ProductoService } from "../../@core/data/producto.service";
import { ProductoModalComponent } from './producto/producto-modal.component';

const components = [
  MarcaComponent,
  MarcaModalComponent,
  CategoriaComponent,
  CategoriasModalComponent,
  UnidadMedidaComponent,
  UnidadMedidaModalComponent,
  InventarioComponent,
  InventarioModalComponent,
  CProductoComponent,
  ProductoModalComponent,
];

@NgModule({
  declarations: [...routedComponents, ...components, ProductoComponent, ProductoModalComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    ToasterModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    MarcaService,
    DatePipe,
    ToasterService,
    CategoriaService,
    UnidadMedidaService,
    InventarioService,
    ProductoService,
  ],
  entryComponents: [
    MarcaModalComponent,
    MarcaComponent,
    CategoriaComponent,
    CategoriasModalComponent,
    UnidadMedidaComponent,
    UnidadMedidaModalComponent,
    InventarioComponent,
    InventarioModalComponent,
    CProductoComponent,
    ProductoModalComponent,
  ],
})
export class ProductosModule {}
