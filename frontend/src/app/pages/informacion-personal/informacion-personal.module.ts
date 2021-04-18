import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import {
  InformacionPersonalRoutingModule,
  routedComponents,
} from "./informacion-personal-routing.module";
import { PerfilComponent } from './perfil/perfil.component';
import { InformacionPersonalComponent } from './informacion-personal.component';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { IndexService } from '../../@core/data/index.service';
import { NbAuthJWTInterceptor } from '@nebular/auth';
import { PerfilEditComponent } from './perfil/perfil-edit.component';
import { UsuarioService } from '../../@core/data/usuarios.service';
import { InfoPersonalEditComponent } from './perfil/info-personal-edit.component';
import { InfoPersonalService } from '../../@core/data/info-personal.service';
import { DireccionEnvioComponent } from './direccion-envio/direccion-envio.component';
import { DireccionEnvioModalComponent } from './direccion-envio/direccion-envio-modal.component';

const components = [
  PerfilComponent,
  PerfilEditComponent,
  InfoPersonalEditComponent,
  DireccionEnvioComponent,
  DireccionEnvioModalComponent,
];

@NgModule({
  declarations: [
    ...routedComponents,
    ...components,
    InformacionPersonalComponent,
  ],
  imports: [
    CommonModule,
    InformacionPersonalRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    ToasterModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    DatePipe,
    ToasterService,
    NbToastrService,
    UsuarioService,
    InfoPersonalService,
  ],
  entryComponents: [
    PerfilComponent,
    PerfilEditComponent,
    InfoPersonalEditComponent,
    DireccionEnvioComponent,
    DireccionEnvioModalComponent,
  ],
})
export class InformacionPersonalModule {}
