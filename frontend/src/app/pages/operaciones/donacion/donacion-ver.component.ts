import { Component } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DonacionService } from '../../../@core/data/donacion.service';
import { Donacion} from '../../../@core/modelos/donacion';
import { Observable } from "rxjs/Observable";
import { DonacionDialogComponent} from './donacion-dialog.component';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { DatePipe } from '@angular/common';
import { DonacionModalComponent } from './donacion-modal.component';
import { DonacionPersonaModalComponent } from './donacion-modal-persona.component';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { TipoDonacion } from '../../../@core/modelos/tipo-donacion';
import { TipoDonacionService } from '../../../@core/data/tipo-donacion.service';
import { Persona } from '../../../@core/modelos/persona';
import { TipoPredonacion } from '../../../@core/modelos/tipo-predonacion';
import { TipoPredonacionService } from '../../../@core/data/tipo-predonacion.service';
import { DetPredonacion } from '../../../@core/modelos/det-predonacion';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from '../../../@core/data/persona.service';
import { EstadoService } from '../../../@core/data/estado-service';
import { Estado } from '../../../@core/modelos/estado';
import { TipoSerologia } from '../../../@core/modelos/tipo-serologia';
import { TipoSerologiaService } from '../../../@core/data/tipo-serologia.service';
import { TipoResSerologiaService } from '../../../@core/data/tipo-res-serologia.service';
import { TipoResSerologia } from '../../../@core/modelos/tipo-res-serologia';
import { DetResPrueba } from '../../../@core/modelos/det-res-prueba';
import { ResPruebaSerologia } from '../../../@core/modelos/res-prueba-serologia';
import { TipoMotivoService } from '../../../@core/data/tipo-motivo.service';
import { TipoMotivo } from '../../../@core/modelos/tipo-motivo';
import { DonacionMotivo } from '../../../@core/modelos/donacion-motivo';

@Component({
  selector: 'ngx-donacion-ver',
  styleUrls: ['./donacion-nuevo.component.scss'],
  templateUrl: './donacion-ver.component.html',
})
export class DonacionVerComponent {
  public item = new Donacion();
  modalRef: NgbModalRef;
  config: ToasterConfig;
  position = 'toast-top-right';
  animationType = 'fade';
  nom_receptor = '';
  nom_donador = '';
  public fec_donacion : NgbDateStruct;
  lstTipoDonacion:TipoDonacion[];
  lstTipoPredonacion:TipoPredonacion[];
  lstTipoSerologia:TipoSerologia[];
  lstTipoResSerologia: TipoResSerologia[];
  lstTipoMotivo: TipoMotivo[];

  lstEstados:Estado[];
  timeout = 5000;
  toastsLimit = 5;
  public tit_motivo_donacion: String = "";
  

  constructor(private service: DonacionService, private modalService: NgbModal, private toasterService: ToasterService, private srvTipoDonacion:TipoDonacionService,
    private srvPruebaPre:TipoPredonacionService, private route: ActivatedRoute, private router: Router, private srvPersona:PersonaService,
    private srvEstados:EstadoService, private srvTipoSerologia: TipoSerologiaService, private srvTipoResSerologia: TipoResSerologiaService, private srvTipoMotivo: TipoMotivoService) {
        this.srvTipoDonacion.findAll().subscribe(
            items => {
                this.lstTipoDonacion = items;
            },
            err => {
                console.log(err);
            }
        );

        this.srvEstados.findAll().subscribe(
            items => {
                this.lstEstados = items;
            },
            err => {
                console.log(err);
            }
        );

        this.srvTipoSerologia.findAllNormal().subscribe(
            items => {
                this.lstTipoSerologia = items;
            },
            err => {
                console.log(err);
            }
        );

        this.srvTipoResSerologia.findAll().subscribe(
            items => {
                this.lstTipoResSerologia = items;
            },
            err => {
                console.log(err);
            }
        );

        this.srvPruebaPre.findAll().subscribe(
          items => {
            this.lstTipoPredonacion = items; 
          },
          err => {
            console.log(err);
          }
        );

    this.route.params.subscribe( params => this.cargar(params.id) );
  }

  cargar(cod_donacion:number){
    this.service.findById(cod_donacion)
        .subscribe(
        data => {
            var raw = new Date(data.fec_donacion);
            this.fec_donacion = {
                year: raw.getFullYear(), 
                month: raw.getMonth()+1, 
                day: raw.getDate()
              };
            //Se busca a la persona donadora
            this.srvPersona.findById(data.cod_persona_donador).subscribe(
                data => {
                    this.nom_donador = data.nombres + " " + data.apellidos;
                },
                error => {
                }
            );

            //Se busca a la persona receptora
            this.srvPersona.findById(data.cod_persona_receptor).subscribe(
                data => {
                    this.nom_receptor = data.nombres + " " + data.apellidos;
                },
                error => {
                }
            );

            if (data.res_prueba_serologia.length == 0){
              var rsSerologia = new ResPruebaSerologia();

              var lstTRSerologia = [];
              for (var n = 0; n<this.lstTipoSerologia.length;n++){
                var it = new DetResPrueba();
                it.cod_serologia = this.lstTipoSerologia[n].cod_serologia;
                it.cod_tipo_res_serologia = 3;
                it.nom_serologia = this.lstTipoSerologia[n].nombre;
                lstTRSerologia.push(it);
              }
              rsSerologia.det_res_prueba = lstTRSerologia;

              var lstRsSerologia = [];
              lstRsSerologia.push(rsSerologia);

              data.res_prueba_serologia = lstRsSerologia;
            }else{
              for (var n= 0; n< data.res_prueba_serologia[0].det_res_prueba.length;n++){
                  for (var n1=0;n1<this.lstTipoSerologia.length;n1++){
                    if (data.res_prueba_serologia[0].det_res_prueba[n].cod_serologia == this.lstTipoSerologia[n1].cod_serologia){
                      data.res_prueba_serologia[0].det_res_prueba[n].nom_serologia = this.lstTipoSerologia[n1].nombre;
                    }
                  }
              }
            }

            this.item = data;

            if (this.item.cod_estado == 1){
                this.tit_motivo_donacion = "Motivos de Donación";

                this.srvTipoMotivo.findById(this.item.cod_estado).subscribe(
                  datos => {
                        this.lstTipoMotivo = datos;
                        this.cargarMotivoDonacion();
                    },
                    err => {
                        console.log(err);
                    }
                );
            }else if (this.item.cod_estado == 2){
                this.tit_motivo_donacion = "Motivo de Diferido";
                this.srvTipoMotivo.findById(this.item.cod_estado).subscribe(
                  datos => {
                        this.lstTipoMotivo = datos;
                        this.cargarMotivoDonacion();
                    },
                    err => {
                        console.log(err);
                    }
                );
            }else if (this.item.cod_estado == 3){
                this.tit_motivo_donacion = "Motivo de Rechazo";
                this.srvTipoMotivo.findById(this.item.cod_estado).subscribe(
                  datos => {
                        this.lstTipoMotivo = datos;
                        this.cargarMotivoDonacion();
                    },
                    err => {
                        console.log(err);
                    }
                );
            }
        },
        error => {
          //console.log(error);
        },
        () => {

    });    
  }

  cambioEstado(){
    if (this.item.cod_estado == 1){
        this.tit_motivo_donacion = "Motivos de Donación";
        this.srvTipoMotivo.findById(this.item.cod_estado).subscribe(
          datos => {
                this.lstTipoMotivo = datos;
                this.item.donacion_motivo = [];
                this.cargarMotivoDonacion();
            },
            err => {
                console.log(err);
            }
        );
    }else if (this.item.cod_estado == 2){
        this.tit_motivo_donacion = "Motivo de Diferido";
        this.srvTipoMotivo.findById(this.item.cod_estado).subscribe(
          datos => {
                this.lstTipoMotivo = datos;
                this.item.donacion_motivo = [];
                this.cargarMotivoDonacion();
            },
            err => {
                console.log(err);
            }
        );
    }else if (this.item.cod_estado == 3){
        this.tit_motivo_donacion = "Motivo de Rechazo";
        this.srvTipoMotivo.findById(this.item.cod_estado).subscribe(
          datos => {
                this.lstTipoMotivo = datos;
                this.item.donacion_motivo = [];
                this.cargarMotivoDonacion();
            },
            err => {
                console.log(err);
            }
        );
    }
  }

  cargarMotivoDonacion(){
    if (this.item.donacion_motivo.length == 0){
      var lstDonacionMotivo = [];
      for (var n = 0; n<this.lstTipoMotivo.length;n++){
        var it = new DonacionMotivo();
        it.cod_tipo_motivo = this.lstTipoMotivo[n].cod_tipo_motivo;
        it.nombre = this.lstTipoMotivo[n].nombre
        it.estado = 0;
        lstDonacionMotivo.push(it);
      }
      this.item.donacion_motivo = lstDonacionMotivo;
    }else{
      for (var n= 0; n< this.item.donacion_motivo.length;n++){
          for (var n1=0;n1<this.lstTipoMotivo.length;n1++){
            if (this.item.donacion_motivo[n].cod_tipo_motivo == this.lstTipoMotivo[n1].cod_tipo_motivo){
              this.item.donacion_motivo[n].nombre = this.lstTipoMotivo[n1].nombre;
            }
          }
      }
    }
  }


  guardar() {
    this.item.fec_donacion = new Date(this.fec_donacion.year, this.fec_donacion.month-1, this.fec_donacion.day);
    for (var n = 0; n < this.item.det_prueba_predonacion.length; n++) {
      if (!this.item.det_prueba_predonacion[n].estado){
        this.item.det_prueba_predonacion[n].estado = 0;
      }else{
        this.item.det_prueba_predonacion[n].estado = 1;
      }
    }

    var encontrado = false;
    for (var n= 0; n< this.item.res_prueba_serologia[0].det_res_prueba.length;n++){
        if (this.item.res_prueba_serologia[0].det_res_prueba[n].cod_tipo_res_serologia == 1 || this.item.res_prueba_serologia[0].det_res_prueba[n].cod_tipo_res_serologia == 2){
          encontrado = true;
        }
    }

    if (encontrado){
      if (this.item.cod_estado != 3){
        this.item.cod_estado = 3;
      }
    }

    for (var n = 0; n < this.item.donacion_motivo.length; n++) {
      if (!this.item.donacion_motivo[n].estado){
        this.item.donacion_motivo[n].estado = 0;
      }else{
        this.item.donacion_motivo[n].estado = 1;
      }
    }

    this.service.actualizar(this.item).subscribe(
      data => {
        
        this.showToast("info", "Guardar", "Registros guardados exitósamente.");
        setTimeout((router: Router) => {
            this.router.navigate(['pages/operaciones/donacion']);
        }, 1000);
      },
      error => {
        if (`${this.getDismissReason(error)}` != "undefined"){
          this.showToast("error", "Error", `${this.getDismissReason(error)}`);
        }
      }
    );
    console.log(this.item);
  }

  busqPersona(tipo:number){
    this.modalRef = this.modalService.open(DonacionModalComponent, { size: 'lg', container: 'nb-layout' });
    if (tipo == 1){
      this.modalRef.componentInstance.modalHeader = 'Buscar Donador';
    }else{
      this.modalRef.componentInstance.modalHeader = 'Buscar Receptor';
    }
    
    this.modalRef.componentInstance.tipo = tipo;
    this.modalRef.componentInstance.esNuevo = true;

    this.modalRef.result.then((data) => {
      //this.showToast("info", "Guardar", data);
      if (tipo==1){
        this.item.cod_persona_donador = data.cod_persona;
        this.nom_donador = data.nombres + ' ' + data.apellidos;
      }else{
        this.item.cod_persona_receptor = data.cod_persona;
        this.nom_receptor = data.nombres + ' ' + data.apellidos;
      }
      
      console.log(data);
    }, (reason) => {
      if (`${this.getDismissReason(reason)}` != "undefined"){
        this.showToast("error", "Error", `${this.getDismissReason(reason)}`);
      }
      
    });
  }

  nuevaPersona() {
    this.modalRef = this.modalService.open(DonacionPersonaModalComponent, { size: 'lg', container: 'nb-layout' });
    this.modalRef.componentInstance.modalHeader = 'Nueva Persona';
    this.modalRef.componentInstance.item = new Persona();
    this.modalRef.componentInstance.esNuevo = true;
    var raw = new Date();
    
    this.modalRef.result.then((data) => {
      this.showToast("info", "Guardar", data);
    }, (reason) => {
      if (`${this.getDismissReason(reason)}` != "undefined"){
        this.showToast("error", "Error", `${this.getDismissReason(reason)}`);
      }
    });
  }

  closeModal() {
    this.router.navigate(['pages/operaciones/donacion']);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return '';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return '';
    } else {
      return  `${reason}`;
    }
}

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: true,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }
}
