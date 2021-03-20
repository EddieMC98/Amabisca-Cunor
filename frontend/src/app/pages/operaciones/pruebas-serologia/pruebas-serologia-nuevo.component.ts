import { Component } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DonacionService } from '../../../@core/data/donacion.service';
import { Donacion} from '../../../@core/modelos/donacion';
import { Observable } from "rxjs/Observable";
import { PruebasSerologiaDialogComponent} from './pruebas-serologia-dialog.component';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { DatePipe } from '@angular/common';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { TipoDonacion } from '../../../@core/modelos/tipo-donacion';
import { TipoDonacionService } from '../../../@core/data/tipo-donacion.service';
import { Persona } from '../../../@core/modelos/persona';
import { TipoPredonacion } from '../../../@core/modelos/tipo-predonacion';
import { TipoPredonacionService } from '../../../@core/data/tipo-predonacion.service';
import { DetPredonacion } from '../../../@core/modelos/det-predonacion';
import { Router } from '@angular/router';
import { PruebaSerologia } from '../../../@core/modelos/prueba-serologia';
import { TipoServicio } from '../../../@core/modelos/tipo-servicio';
import { PruebaSerologiaService } from '../../../@core/data/prueba-serologia.service';
import { TipoServicioService } from '../../../@core/data/tipo-servicio.service';
import { DetPruebaSerologia } from '../../../@core/modelos/det-prueba-serologia';
import { TipoResSerologiaService } from '../../../@core/data/tipo-res-serologia.service';
import { TipoSerologiaService } from '../../../@core/data/tipo-serologia.service';
import { TipoResSerologia } from '../../../@core/modelos/tipo-res-serologia';
import { TipoSerologia } from '../../../@core/modelos/tipo-serologia';

@Component({
  selector: 'ngx-pruebas-serologia-nuevo',
  styleUrls: ['./pruebas-serologia-nuevo.component.scss'],
  templateUrl: './pruebas-serologia-nuevo.component.html',
})
export class PruebasSerologiaNuevoComponent {
  public item = new PruebaSerologia();
  public servCod:any;

  modalRef: NgbModalRef;
  config: ToasterConfig;
  position = 'toast-top-right';
  animationType = 'fade';
  nom_receptor = '';
  nom_donador = '';
  public fec_creacion : NgbDateStruct;
  lstTipoServicio:TipoServicio[];
  lstTipoSerologia:TipoSerologia[];
  lstTipoResSerologia: TipoResSerologia[];
  timeout = 5000;
  toastsLimit = 5;

  config2 = {
    displayKey:"nombre", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Select' // text to be displayed when no item is selected defaults to Select.
  }
  

  constructor(private service: PruebaSerologiaService, private modalService: NgbModal, private toasterService: ToasterService, private srvTipoServicio:TipoServicioService,
  private router: Router, private srvTipoSerologia: TipoSerologiaService, private srvTipoResSerologia: TipoResSerologiaService) {
    this.srvTipoServicio.findAll().subscribe(
      items => {
        this.lstTipoServicio = items;

        this.srvTipoSerologia.findAllRapidas().subscribe(
            items2 => {
                this.lstTipoSerologia = items2;
                this.cargar();
            },
            err => {
                console.log(err);
            }
        );
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

    var raw = new Date();
    this.fec_creacion = {
        year: raw.getFullYear(), 
        month: raw.getMonth()+1, 
        day: raw.getDate()
      };

      this.item.estado = 1;
  }

  cargar(){
    this.item.det_prueba_serologia = [];

    var lstTRSerologia = [];
    for (var n = 0; n<this.lstTipoSerologia.length;n++){
      var it = new DetPruebaSerologia();
      it.cod_serologia = this.lstTipoSerologia[n].cod_serologia;
      it.cod_tipo_res_serologia = 3;
      it.cantidad = 0;
      it.nom_serologia = this.lstTipoSerologia[n].nombre;
       this.item.det_prueba_serologia.push(it);
    }
  }

  guardar() {
    this.item.fec_creacion = new Date(this.fec_creacion.year, this.fec_creacion.month-1, this.fec_creacion.day);
    this.item.cod_servicio = this.servCod[0].cod_servicio;
    this.service.guardar(this.item).subscribe(
      data => {
        this.showToast("info", "Guardar", "Registro almacenado exitósamente.");
        setTimeout((router: Router) => {
            this.router.navigate(['pages/operaciones/pruebas-serologia']);
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

 
  closeModal() {
    this.router.navigate(['pages/operaciones/pruebas-serologia']); 
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
