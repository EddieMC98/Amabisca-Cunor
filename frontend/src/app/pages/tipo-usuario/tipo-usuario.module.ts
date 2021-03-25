import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { routedComponents, TipoUsuarioRoutingModule } from './tipo-usuario-routing.module';
import { PaisComponent } from './pais/pais.component';
import { PaisModalComponent } from './pais/pais-modal.component';
import { TipoUsuarioComponent } from './tipo-usuario.component';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { PaisService } from '../../@core/data/pais.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbAuthJWTInterceptor } from '@nebular/auth';

const components = [
  PaisComponent,
  PaisModalComponent
];

@NgModule({
  declarations: [...routedComponents,, ...components,TipoUsuarioComponent],
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    ToasterModule,
    TipoUsuarioRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    PaisService,
    DatePipe,
    ToasterService,
  ],
  entryComponents: [
    PaisComponent,
    PaisModalComponent
  ],
})
export class TipoUsuarioModule { }
