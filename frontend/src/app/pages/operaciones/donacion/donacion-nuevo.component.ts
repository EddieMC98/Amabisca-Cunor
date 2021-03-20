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
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-donacion-nuevo',
  styleUrls: ['./donacion-nuevo.component.scss'],
  templateUrl: './donacion-nuevo.component.html',
})
export class DonacionNuevoComponent {
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
  timeout = 5000;
  toastsLimit = 5;
  

  constructor(private service: DonacionService, private modalService: NgbModal, private toasterService: ToasterService, private srvTipoDonacion:TipoDonacionService,
  private srvPruebaPre:TipoPredonacionService, private router: Router) {
    this.srvTipoDonacion.findAll().subscribe(
      items => {
        this.lstTipoDonacion = items;
      },
      err => {
        console.log(err);
      }
 
    );

    this.srvPruebaPre.findAll().subscribe(
      items => {
        var lstDetPredonacion = [];
        for (var n = 0; n<items.length;n++){
          var it = new DetPredonacion();
          it.cod_predonacion = items[n].cod_predonacion;
          it.estado = 0;
          it.fec_creacion = new Date();
          lstDetPredonacion.push(it);
        }
        this.item.det_prueba_predonacion = lstDetPredonacion;
        this.lstTipoPredonacion = items;
        
      },
      err => {
        console.log(err);
      }
 
    );

    var raw = new Date();
    this.fec_donacion = {
        year: raw.getFullYear(), 
        month: raw.getMonth()+1, 
        day: raw.getDate()
      };
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
    this.service.guardar(this.item).subscribe(
      data => {
        this.showToast("info", "Guardar", "Registro almacenado exitósamente.");
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
