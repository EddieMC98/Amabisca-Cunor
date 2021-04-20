import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { routedComponents, TipoCambioRoutingModule } from './tipo-cambio-routing.module';
import { IndexComponent } from './index/index.component';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { NbAuthJWTInterceptor } from '@nebular/auth';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TipoCambioComponent } from './tipo-cambio.component';
import { NbToastrService } from '@nebular/theme';
import { TipoCambioService } from '../../@core/data/tipo-cambio.service';
import { IndexModalComponent } from './index/index-modal.component';

const components = [
  IndexComponent,
];

@NgModule({
  declarations: [
    ...routedComponents,
    ...components,
    TipoCambioComponent,
    IndexModalComponent,
  ],
  imports: [
    CommonModule,
    TipoCambioRoutingModule,
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
  ],
  entryComponents: [IndexComponent, IndexModalComponent,],
})
export class TipoCambioModule {}
