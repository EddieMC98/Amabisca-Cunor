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

const components = [
  MarcaComponent,
  MarcaModalComponent,
  CategoriaComponent,
  CategoriasModalComponent,
];

@NgModule({
  declarations: [...routedComponents, ...components, ProductoComponent],
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
  ],
  entryComponents: [
    MarcaModalComponent,
    MarcaComponent,
    CategoriaComponent,
    CategoriasModalComponent,
  ],
})
export class ProductosModule {}
