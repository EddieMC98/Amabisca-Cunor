import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import {
  CatalogoRoutingModule,
  routedComponents,
} from "./catalogo-routing.module";
import { IndexComponent } from "./index/index.component";
import { CatalogoComponent } from "./catalogo.component";
import { ThemeModule } from "../../@theme/theme.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ToasterModule, ToasterService } from "angular2-toaster";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NbAuthJWTInterceptor } from "@nebular/auth";
import { IndexService } from "../../@core/data/index.service";
import { IndexModalComponent } from "./index/index-modal.component";
import { NbSearchModule, NbSearchService, NbToastrService } from "@nebular/theme";
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { CategoriaService } from "../../@core/data/categoria.service";
import { MarcaService } from "../../@core/data/marca.service";
import { UnidadMedidaService } from "../../@core/data/unidad-medida.service";

const components = [IndexComponent, IndexModalComponent,];

@NgModule({
  declarations: [
    ...routedComponents,
    ...components,
    CatalogoComponent,
    IndexComponent,
    IndexModalComponent,
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    ToasterModule,
    NgxPaginationModule,
    NbSearchModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    DatePipe,
    ToasterService,
    IndexService,
    NbToastrService,
    NbSearchService,
    CategoriaService,
    MarcaService,
    UnidadMedidaService,
  ],
  entryComponents: [IndexComponent, IndexModalComponent],
})
export class CatalogoModule {}
