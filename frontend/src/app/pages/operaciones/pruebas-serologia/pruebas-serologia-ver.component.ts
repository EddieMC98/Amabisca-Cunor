import { Component } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs/Observable";
import { PruebasSerologiaDialogComponent} from './pruebas-serologia-dialog.component';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { DatePipe } from '@angular/common';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from '../../../@core/data/persona.service';
import { TipoSerologia } from '../../../@core/modelos/tipo-serologia';
import { TipoSerologiaService } from '../../../@core/data/tipo-serologia.service';
import { TipoResSerologiaService } from '../../../@core/data/tipo-res-serologia.service';
import { TipoResSerologia } from '../../../@core/modelos/tipo-res-serologia';
import { PruebaSerologia } from '../../../@core/modelos/prueba-serologia';
import { PruebaSerologiaService } from '../../../@core/data/prueba-serologia.service';
import { TipoServicioService } from '../../../@core/data/tipo-servicio.service';
import { TipoServicio } from '../../../@core/modelos/tipo-servicio';

@Component({
  selector: 'ngx-pruebas-serologia-ver',
  styleUrls: ['./pruebas-serologia-nuevo.component.scss'],
  templateUrl: './pruebas-serologia-ver.component.html',
})
export class PruebasSerologiaVerComponent {
  public item = new PruebaSerologia();
  modalRef: NgbModalRef;
  config: ToasterConfig;
  position = 'toast-top-right';
  animationType = 'fade';
  nom_receptor = '';
  nom_donador = '';
  public servCod:any;
  public fec_creacion : NgbDateStruct;
  lstTipoSerologia:TipoSerologia[];
  lstTipoResSerologia: TipoResSerologia[];
  lstTipoServicio:TipoServicio[];
  timeout = 5000;
  toastsLimit = 5;
  public tit_motivo_donacion: String = "";

  config2 = {
    displayKey:"nombre", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Select' // text to be displayed when no item is selected defaults to Select.
  }

  constructor(private service: PruebaSerologiaService, private modalService: NgbModal, private toasterService: ToasterService,
     private route: ActivatedRoute, private router: Router, private srvPersona:PersonaService,
     private srvTipoSerologia: TipoSerologiaService, private srvTipoResSerologia: TipoResSerologiaService, private srvTipoServicio: TipoServicioService) {
      this.srvTipoServicio.findAll().subscribe(
        items => {
          this.lstTipoServicio = items;
        },
        err => {
          console.log(err);
        }
      );

        this.srvTipoSerologia.findAllRapidas().subscribe(
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

    this.route.params.subscribe( params => this.cargar(params.id) );
  }

  cargar(cod_prueba:number){
    this.service.findById(cod_prueba)
        .subscribe(
        data => {
            var raw = new Date(data.fec_creacion);
            this.fec_creacion = {
                year: raw.getFullYear(), 
                month: raw.getMonth()+1, 
                day: raw.getDate()
              };
              
              for (var n= 0; n< data.det_prueba_serologia.length;n++){
                  for (var n1=0;n1<this.lstTipoSerologia.length;n1++){
                    if (data.det_prueba_serologia[n].cod_serologia == this.lstTipoSerologia[n1].cod_serologia){
                      data.det_prueba_serologia[n].nom_serologia = this.lstTipoSerologia[n1].nombre;
                    }
                }
              }

              this.servCod = [];
            for (var n=0; n<this.lstTipoServicio.length;n++){
              if (this.lstTipoServicio[n].cod_servicio == data.cod_servicio){
                this.servCod.push(this.lstTipoServicio[n]);
              }
            }
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
    this.item.cod_servicio = this.servCod[0].cod_servicio;
    this.service.actualizar(this.item).subscribe(
      data => {
        
        this.showToast("info", "Guardar", "Registros guardados exitósamente.");
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
