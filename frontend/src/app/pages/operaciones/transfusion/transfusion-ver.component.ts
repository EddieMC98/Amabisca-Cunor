import { Component } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DonacionService } from '../../../@core/data/donacion.service';
import { Donacion} from '../../../@core/modelos/donacion';
import { Observable } from "rxjs/Observable";
import { TransfusionDialogComponent} from './transfusion-dialog.component';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { DatePipe } from '@angular/common';
import { DonacionModalComponent } from '../donacion/donacion-modal.component';
import { DonacionPersonaModalComponent } from '../donacion/donacion-modal-persona.component';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { Persona } from '../../../@core/modelos/persona';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from '../../../@core/data/persona.service';
import { TipoTransfusionService } from '../../../@core/data/tipo-transfusion.service';
import { TipoServicioService } from '../../../@core/data/tipo-servicio.service';
import { TipoServicio } from '../../../@core/modelos/tipo-servicio';
import { TipoTransfusion } from '../../../@core/modelos/tipo-transfusion';
import { SolicitudTransfusion } from '../../../@core/modelos/solicitud-transfusion';
import { SolicitudTransfusionService } from '../../../@core/data/solicitud-transfusion.service';

@Component({
  selector: 'ngx-transfusion-ver',
  styleUrls: ['./transfusion-nuevo.component.scss'],
  templateUrl: './transfusion-ver.component.html',
})
export class TransfusionVerComponent {
  public item = new SolicitudTransfusion();
  modalRef: NgbModalRef;
  config: ToasterConfig;
  position = 'toast-top-right';
  animationType = 'fade';
  nom_receptor = '';
  nom_donador = '';
  public fec_creacion : NgbDateStruct;
  lstServicios:TipoServicio[];
  lstTipoTransfusion:TipoTransfusion[];
  timeout = 5000;
  toastsLimit = 5;
  public tit_motivo_donacion: String = "";
  

  constructor(private service: SolicitudTransfusionService, private modalService: NgbModal, private toasterService: ToasterService, 
    private route: ActivatedRoute, private router: Router, private srvPersona:PersonaService, private srvTipoTransfusion: TipoTransfusionService, private srvTipoServicio: TipoServicioService) {
        this.srvTipoTransfusion.findAll().subscribe(
            items => {
                this.lstTipoTransfusion = items;
            },
            err => {
                console.log(err);
            }
        );

        this.srvTipoServicio.findAll().subscribe(
            items => {
                this.lstServicios = items;
            },
            err => {
                console.log(err);
            }
        );

    this.route.params.subscribe( params => this.cargar(params.id) );
  }

  cargar(cod_transfusion:number){
    this.service.findById(cod_transfusion)
        .subscribe(
        data => {
            var raw = new Date(data.fec_creacion);
            this.fec_creacion = {
                year: raw.getFullYear(), 
                month: raw.getMonth()+1, 
                day: raw.getDate()
              };
           
            //Se busca a la persona receptora
            this.srvPersona.findById(data.cod_persona).subscribe(
                data => {
                    this.nom_receptor = data.nombres + " " + data.apellidos;
                },
                error => {
                }
            );
            this.item = data;
        },
        error => {
          //console.log(error);
        },
        () => {

    });    
  }

 


  guardar() {
    this.item.fec_creacion = new Date(this.fec_creacion.year, this.fec_creacion.month-1, this.fec_creacion.day);

    this.service.actualizar(this.item).subscribe(
      data => {
        
        this.showToast("info", "Guardar", "Registro guardado exitósamente.");
        setTimeout((router: Router) => {
            this.router.navigate(['pages/operaciones/transfusion']);
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
        this.item.cod_persona = data.cod_persona;
        this.nom_donador = data.nombres + ' ' + data.apellidos;
      }else{
        this.item.cod_persona = data.cod_persona;
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
    this.router.navigate(['pages/operaciones/transfusion']);
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
