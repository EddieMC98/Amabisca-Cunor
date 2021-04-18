import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import {
  CarritoComprasRoutingModule,
  routedComponents,
} from "./carrito-compras-routing.module";
import { IndexComponent } from "./index/index.component";
import { CarritoComprasComponent } from "./carrito-compras.component";
import { ThemeModule } from "../../@theme/theme.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ToasterModule, ToasterService } from "angular2-toaster";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NbAuthJWTInterceptor } from "@nebular/auth";
import { CarritoComprasService } from "../../@core/data/carrito-compras.service";
import { InfoPersonalService } from "../../@core/data/info-personal.service";
import { Usuario } from "../../@core/modelos/usuario";
import { UsuarioService } from "../../@core/data/usuarios.service";
import { DireccionEnvioService } from "../../@core/data/direccion-envio.service";
import { NbRadioModule } from "@nebular/theme";
import { IndexModalComponent } from './index/index-modal.component';
import { PaymentModalComponent } from './index/payment-modal.component';

const components = [IndexComponent, IndexModalComponent, PaymentModalComponent,];

@NgModule({
  declarations: [...routedComponents, ...components, CarritoComprasComponent],
  imports: [
    CommonModule,
    CarritoComprasRoutingModule,
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    ToasterModule,
    NbRadioModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    DatePipe,
    ToasterService,
    CarritoComprasService,
    InfoPersonalService,
    UsuarioService,
    DireccionEnvioService,
    ToasterService,
  ],
  entryComponents: [IndexComponent, IndexModalComponent, PaymentModalComponent,],
})
export class CarritoComprasModule {}
