import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoEnvioRoutingModule ,routedComponents} from '../tipo-envio/tipo-envio-routing.module';
import {TipoEnvioComponent} from './tipo-envio/tipo-envio.component';
import { TipoEnvioModalComponent } from './tipo-envio/tipo-envio-modal.component';
import { TipoEnvioService } from '../../@core/data/tipo-envio.service';
import { NbAuthJWTInterceptor } from '@nebular/auth';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';

import { ToasterModule, ToasterService } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    TipoEnvioModalComponent,
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    TipoEnvioRoutingModule,
    ThemeModule,    
    Ng2SmartTableModule,
    ToasterModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
        TipoEnvioService
  ],
  entryComponents: [
    TipoEnvioModalComponent,
  ],
})
export class TipoEnvioModule { }
