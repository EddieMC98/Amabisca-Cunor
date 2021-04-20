import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { IndexComponent } from "./index/index.component";
import { ToasterModule, ToasterService } from "angular2-toaster";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from "../../@theme/theme.module";
import { NbAuthJWTInterceptor } from "@nebular/auth";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NbToastrService } from "@nebular/theme";
import { TipoCambioService } from "../../@core/data/tipo-cambio.service";
import { PedidosComponent } from "./pedidos.component";
import { PedidosRoutingModule, routedComponents } from "./pedidos-routing.module";
import { DetalleEnvioModalComponent } from './index/detalle-envio-modal.component';
import { IndexClienteComponent } from './index-cliente/index-cliente.component';
import { IndexClienteModalComponent } from './index-cliente/index-cliente-modal.component';
import { UsuarioService } from "../../@core/data/usuarios.service";
import { InfoPersonalService } from "../../@core/data/info-personal.service";

const components = [IndexComponent, DetalleEnvioModalComponent, IndexClienteModalComponent, IndexClienteModalComponent,];

@NgModule({
  declarations: [...routedComponents, ...components, PedidosComponent, IndexClienteComponent, IndexClienteModalComponent],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    ToasterModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    DatePipe,
    ToasterService,
    NbToastrService,
    TipoCambioService,
    UsuarioService,
    InfoPersonalService,
  ],
  entryComponents: [IndexComponent, DetalleEnvioModalComponent, IndexClienteComponent, IndexClienteModalComponent,],
})
export class PedidosModule {}
