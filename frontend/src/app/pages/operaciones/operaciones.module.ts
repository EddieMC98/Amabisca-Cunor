import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { OperacionesRoutingModule, routedComponents } from './operaciones-routing.module';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { TransNoUtilizadaComponent } from './trans-no-utilizada/trans-no-utilizada.component';
import { TransNoUtilizadaModalComponent } from './trans-no-utilizada/trans-no-utilizada-modal.component';
import { TransNoUtilizadaDialogComponent} from './trans-no-utilizada/trans-no-utilizada-dialog.component';
import { TransNoUtilizadaService } from '../../@core/data/trans-no-utilizada.service';
import { UnidadDescartadaComponent } from './unidad-descartada/unidad-descartada.component';
import { UnidadDescartadaModalComponent } from './unidad-descartada/unidad-descartada-modal.component';
import { UnidadDescartadaDialogComponent} from './unidad-descartada/unidad-descartada-dialog.component';
import { UnidadDescartadaService } from '../../@core/data/unidad-descartada.service';
import { TipoDescarteService } from '../../@core/data/tipo-descarte.service';
import { TipoSangreService } from '../../@core/data/tipo-sangre.service';
import { DonacionExternaComponent } from './donacion-externa/donacion-externa.component';
import { DonacionExternaModalComponent } from './donacion-externa/donacion-externa-modal.component';
import { DonacionExternaDialogComponent } from './donacion-externa/donacion-externa-dialog.component';
import { DonacionExternaService } from '../../@core/data/donacion-externa.service';
import { DonacionComponent } from './donacion/donacion.component';
import { DonacionModalComponent } from './donacion/donacion-modal.component';
import { DonacionDialogComponent } from './donacion/donacion-dialog.component';
import { DonacionService } from '../../@core/data/donacion.service';
import { DonacionNuevoComponent } from './donacion/donacion-nuevo.component';
import { PersonaService } from '../../@core/data/persona.service';
import { TipoDonacionService } from '../../@core/data/tipo-donacion.service';
import { DonacionPersonaModalComponent } from './donacion/donacion-modal-persona.component';
import { GrupoEtnicoService } from '../../@core/data/grupo-etnico.service';
import { TipoPredonacionService } from '../../@core/data/tipo-predonacion.service';
import { DonacionVerComponent } from './donacion/donacion-ver.component';
import { EstadoService } from '../../@core/data/estado-service';
import { TipoSerologia } from '../../@core/modelos/tipo-serologia';
import { TipoSerologiaService } from '../../@core/data/tipo-serologia.service';
import { TipoResSerologiaService } from '../../@core/data/tipo-res-serologia.service';
import { TipoMotivoService } from '../../@core/data/tipo-motivo.service';
import { TipoComponenteService } from '../../@core/data/tipo-componente.service';
import { TransfusionDialogComponent } from './transfusion/transfusion-dialog.component';
import { TransfusionNuevoComponent } from './transfusion/transfusion-nuevo.component';
import { TransfusionComponent } from './transfusion/transfusion.component';
import { TransfusionVerComponent } from './transfusion/transfusion-ver.component';
import { SolicitudTransfusion } from '../../@core/modelos/solicitud-transfusion';
import { SolicitudTransfusionService } from '../../@core/data/solicitud-transfusion.service';
import { TipoTransfusionService } from '../../@core/data/tipo-transfusion.service';
import { TipoServicio } from '../../@core/modelos/tipo-servicio';
import { TipoServicioService } from '../../@core/data/tipo-servicio.service';
import { PersonasDialogComponent } from './personas/personas-dialog.component';
import { PersonasModalComponent } from './personas/personas-modal.component';
import { PersonasComponent } from './personas/personas.component';
import { PruebasSerologiaComponent } from './pruebas-serologia/pruebas-serologia.component';
import { PruebasSerologiaDialogComponent } from './pruebas-serologia/pruebas-serologia-dialog.component';
import { PruebasSerologiaNuevoComponent } from './pruebas-serologia/pruebas-serologia-nuevo.component';
import { PruebasSerologiaVerComponent } from './pruebas-serologia/pruebas-serologia-ver.component';
import { PruebaSerologiaService } from '../../@core/data/prueba-serologia.service';
import { FraccionamientoComponent } from './fraccionamiento/fraccionamiento.component';
import { FraccionamientoDialogComponent } from './fraccionamiento/fraccionamiento-dialog.component';
import { FraccionamientoModalComponent } from './fraccionamiento/fraccionamiento-modal.component';
import { FraccionamientoService } from '../../@core/data/fraccionamiento.service';
import { IntercambioComponent } from './intercambio/intercambio.component';
import { IntercambioDialogComponent } from './intercambio/intercambio-dialog.component';
import { IntercambioModalComponent } from './intercambio/intercambio-modal.component';
import { UnidadIntercambioService } from '../../@core/data/unidad-intercambio.service';
import { TipoIntercambioService } from '../../@core/data/tipo-intercambio.service';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbAuthJWTInterceptor } from '@nebular/auth';

const components = [
  TransNoUtilizadaComponent,
  TransNoUtilizadaModalComponent,
  TransNoUtilizadaDialogComponent,
  UnidadDescartadaComponent,
  UnidadDescartadaModalComponent,
  UnidadDescartadaDialogComponent,
  DonacionExternaComponent,
  DonacionExternaModalComponent,
  DonacionExternaDialogComponent,
  DonacionComponent,
  DonacionModalComponent,
  DonacionDialogComponent,
  DonacionNuevoComponent,
  DonacionPersonaModalComponent,
  DonacionVerComponent,
  TransfusionDialogComponent,
  TransfusionNuevoComponent,
  TransfusionComponent,
  TransfusionVerComponent,
  PersonasDialogComponent,
  PersonasModalComponent,
  PersonasComponent,
  PruebasSerologiaComponent,
  PruebasSerologiaDialogComponent,
  PruebasSerologiaNuevoComponent,
  PruebasSerologiaVerComponent,
  FraccionamientoComponent,
  FraccionamientoDialogComponent,
  FraccionamientoModalComponent,
  IntercambioComponent,
  IntercambioDialogComponent,
  IntercambioModalComponent,
];

@NgModule({
  imports: [
    ThemeModule,    
    OperacionesRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SelectDropDownModule
  ],
  declarations: [
    ...routedComponents,
    ...components,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    TransNoUtilizadaService,
    UnidadDescartadaService,
    TipoDescarteService,
    TipoSangreService,
    DonacionExternaService,
    DonacionService,
    PersonaService,
    TipoDonacionService,
    GrupoEtnicoService,
    TipoPredonacionService,
    EstadoService,
    TipoSerologiaService,
    TipoResSerologiaService,
    TipoMotivoService,
    TipoComponenteService,
    SolicitudTransfusionService,
    TipoTransfusionService,
    TipoServicioService,
    PruebaSerologiaService,
    FraccionamientoService,
    UnidadIntercambioService,
    TipoIntercambioService,
    ToasterService,
  ],
  entryComponents: [
    TransNoUtilizadaModalComponent,
    TransNoUtilizadaDialogComponent,
    UnidadDescartadaModalComponent,
    UnidadDescartadaDialogComponent,
    DonacionExternaDialogComponent,
    DonacionExternaModalComponent,
    DonacionModalComponent,
    DonacionPersonaModalComponent,
    TransfusionDialogComponent,
    DonacionDialogComponent,
    PersonasDialogComponent,
    PersonasModalComponent,
    PruebasSerologiaDialogComponent,
    FraccionamientoDialogComponent,
    FraccionamientoModalComponent,
    IntercambioDialogComponent,
    IntercambioModalComponent,
  ],
})
export class OperacionesModule { }
