import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ConfiguracionComponent } from './configuracion.component';
import { ToasterModule } from 'angular2-toaster/src/toaster.module';
import { ConfiguracionService } from '../../@core/data/configuracion.service';
import { ToasterService } from 'angular2-toaster';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbAuthJWTInterceptor } from '@nebular/auth';


@NgModule({
  imports: [
    ThemeModule,
    ToasterModule,
  ],
  declarations: [
    ConfiguracionComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    ConfiguracionService,
    ToasterService,
  ],
})
export class ConfiguracionModule { }
