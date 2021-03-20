import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { ReportesRoutingModule, routedComponents } from './reportes-routing.module';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Reporte1Component } from './reporte1/reporte1.component';
import { Reporte2Component } from './reporte2/reporte2.component';
import { Reporte3Component } from './reporte3/reporte3.component';
import { Reporte4Component } from './reporte4/reporte4.component';
import { Reporte5Component } from './reporte5/reporte5.component';
import { ToasterService } from 'angular2-toaster';


const components = [
  Reporte1Component,
  Reporte2Component,
  Reporte3Component,
  Reporte4Component,
  Reporte5Component,
];

@NgModule({
  imports: [
    ThemeModule,    
    ReportesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    ...components,
  ],
  providers: [
    ToasterService,
  ],
  entryComponents: [
  ],
})
export class ReportesModule { }
