import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { CatalogosRoutingModule, routedComponents } from './catalogos-routing.module';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { TipoSangreService} from '../../@core/data/tipo-sangre.service';
import { TipoSangreComponent } from './tipo-sangre/tipo-sangre.component';
import { TipoSangreModalComponent } from './tipo-sangre/tiposangremodal.component';
import { TipoSangreDialogComponent} from './tipo-sangre/tipo-sangre-dialog.component';
import { TipoDescarteService} from '../../@core/data/tipo-descarte.service';
import { TipoDescarteComponent } from './tipo-descarte/tipo-descarte.component';
import { TipoDescarteModalComponent } from './tipo-descarte/tipo-descarte-modal.component';
import { TipoDescarteDialogComponent} from './tipo-descarte/tipo-descarte-dialog.component';
import { TipoDonacionService} from '../../@core/data/tipo-donacion.service';
import { TipoDonacionComponent } from './tipo-donacion/tipo-donacion.component';
import { TipoDonacionModalComponent } from './tipo-donacion/tipo-donacion-modal.component';
import { TipoDonacionDialogComponent} from './tipo-donacion/tipo-donacion-dialog.component';
import { TipoMotivoService} from '../../@core/data/tipo-motivo.service';
import { TipoMotivoComponent } from './tipo-motivo/tipo-motivo.component';
import { TipoMotivoModalComponent } from './tipo-motivo/tipo-motivo-modal.component';
import { TipoMotivoDialogComponent} from './tipo-motivo/tipo-motivo-dialog.component';
import { TipoPredonacionService} from '../../@core/data/tipo-predonacion.service';
import { TipoPredonacionComponent } from './tipo-predonacion/tipo-predonacion.component';
import { TipoPredonacionModalComponent } from './tipo-predonacion/tipo-predonacion-modal.component';
import { TipoPredonacionDialogComponent} from './tipo-predonacion/tipo-predonacion-dialog.component';
import { TipoSerologiaService} from '../../@core/data/tipo-serologia.service';
import { TipoSerologiaComponent } from './tipo-serologia/tipo-serologia.component';
import { TipoSerologiaModalComponent } from './tipo-serologia/tipo-serologia-modal.component';
import { TipoSerologiaDialogComponent} from './tipo-serologia/tipo-serologia-dialog.component';
import { TipoTransfusionService} from '../../@core/data/tipo-transfusion.service';
import { TipoTransfusionComponent } from './tipo-transfusion/tipo-transfusion.component';
import { TipoTransfusionModalComponent } from './tipo-transfusion/tipo-transfusion-modal.component';
import { TipoTransfusionDialogComponent} from './tipo-transfusion/tipo-transfusion-dialog.component';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { TipoServicioService} from '../../@core/data/tipo-servicio.service';
import { TipoServicioComponent } from './tipo-servicio/tipo-servicio.component';
import { TipoServicioModalComponent } from './tipo-servicio/tipo-servicio-modal.component';
import { TipoServicioDialogComponent} from './tipo-servicio/tipo-servicio-dialog.component';
import { GrupoEtnicoService} from '../../@core/data/grupo-etnico.service';
import { GrupoEtnicoComponent } from './grupo-etnico/grupo-etnico.component';
import { GrupoEtnicoModalComponent } from './grupo-etnico/grupo-etnico-modal.component';
import { GrupoEtnicoDialogComponent} from './grupo-etnico/grupo-etnico-dialog.component';
import { EstadoService } from '../../@core/data/estado-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbAuthJWTInterceptor } from '@nebular/auth';


const components = [
  TipoSangreComponent,
  TipoSangreModalComponent,
  TipoSangreDialogComponent,
  TipoDescarteComponent,
  TipoDescarteModalComponent,
  TipoDescarteDialogComponent,
  TipoDonacionComponent,
  TipoDonacionModalComponent,
  TipoDonacionDialogComponent,
  TipoMotivoComponent,
  TipoMotivoModalComponent,
  TipoMotivoDialogComponent,
  TipoPredonacionComponent,
  TipoPredonacionModalComponent,
  TipoPredonacionDialogComponent,
  TipoSerologiaComponent,
  TipoSerologiaModalComponent,
  TipoSerologiaDialogComponent,
  TipoTransfusionComponent,
  TipoTransfusionModalComponent,
  TipoTransfusionDialogComponent,
  TipoServicioComponent,
  TipoServicioModalComponent,
  TipoServicioDialogComponent,
  GrupoEtnicoComponent,
  GrupoEtnicoModalComponent,
  GrupoEtnicoDialogComponent,
];

@NgModule({
  imports: [
    ThemeModule,    
    CatalogosRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
  ],
  declarations: [
    ...routedComponents,
    ...components,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    TipoSangreService,
    TipoDescarteService,
    TipoDonacionService,
    TipoMotivoService,
    TipoPredonacionService,
    TipoSerologiaService,
    TipoTransfusionService,
    TipoServicioService,
    GrupoEtnicoService,
    EstadoService,
    ToasterService,
  ],
  entryComponents: [
    TipoSangreModalComponent,
    TipoSangreDialogComponent,
    TipoDescarteModalComponent,
    TipoDescarteDialogComponent,
    TipoDonacionModalComponent,
    TipoDonacionDialogComponent,
    TipoMotivoModalComponent,
    TipoMotivoDialogComponent,
    TipoPredonacionModalComponent,
    TipoPredonacionDialogComponent,
    TipoSerologiaModalComponent,
    TipoSerologiaDialogComponent,
    TipoTransfusionModalComponent,
    TipoTransfusionDialogComponent,
    TipoServicioModalComponent,
    TipoServicioDialogComponent,
    GrupoEtnicoModalComponent,
    GrupoEtnicoDialogComponent,
  ],
})
export class CatalogosModule { }
