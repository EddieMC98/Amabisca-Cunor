import { Component } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';

import { DonacionService } from '../../../@core/data/donacion.service';
import { Donacion} from '../../../@core/modelos/donacion';
import { Observable } from "rxjs/Observable";
import { ViewCell } from 'ng2-smart-table';
import { DonacionModalComponent } from '../donacion/donacion-modal.component';
import { DonacionDialogComponent} from '../donacion/donacion-dialog.component';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SolicitudTransfusion } from '../../../@core/modelos/solicitud-transfusion';
import { SolicitudTransfusionService } from '../../../@core/data/solicitud-transfusion.service';
import { TransfusionDialogComponent } from './transfusion-dialog.component';

@Component({
  selector: 'ngx-transfusion',
  styleUrls: ['./transfusion.component.scss'],
  templateUrl: './transfusion.component.html',
})
export class TransfusionComponent {
  source: LocalDataSource = new LocalDataSource();
  private items: SolicitudTransfusion[];
  public item = new SolicitudTransfusion();
  modalRef: NgbModalRef;
  config: ToasterConfig;
  position = 'toast-top-right';
  animationType = 'fade';
  timeout = 5000;
  toastsLimit = 5;
  

  constructor(private service: SolicitudTransfusionService, private modalService: NgbModal, private toasterService: ToasterService, private router: Router) {  }

  settings = {
    mode : 'external',
    actions : {
        position : 'right',
        add:false,
        columnTitle: "Acciones",
        custom: [
          
        ]
    },
    edit:  {
      confirmSave: true,
      editButtonContent: '<i class="fa fa-eye"></i>',
    },
      delete:  {
        deleteButtonContent: '<i mdTooltip="Eliminar" class="fa fa-trash"></i>'
    },
    columns: {
      cod_solicitud: {
        title: 'ID',
        type: 'number',
        filter: false,
      },
      cantidad_sangre: {
        title: 'Cantidad de Sangre',
        type: 'number',
        filter: false,
      },
      fec_creacion: {
        title: 'Fecha de registro',
        valuePrepareFunction: (date) => {
          var raw = date.split("-");
          var fecha = raw[2] + "/" + raw[1] + "/"+raw[0]
          return fecha;
        },
        filter: false
      },
      estado: {
        title: 'Estado',
        valuePrepareFunction: (value) => { return value === 1 ? 'Aceptada' : 'Descartada' },
        filter: false
      }
    },
  };

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.findAll().subscribe(
      items => {
        this.items = items;
        this.source.load(this.items);
      },
      err => {
        console.log(err);
      }
 
    );
  }
  
  onSearch(query: string = '') {
    console.log(query);
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'cod_solicitud',
        search: query
      },
      {
        field: 'cantidad_sangre',
        search: query
      },
      {
        field: 'fec_creacion',
        search: query
      }
    ], false); 
  }

  editarRegistro(value) {
    this.router.navigate(['pages/operaciones/transfusion/ver', value.data.cod_solicitud]); 
  }

  eliminarRegistro(value) {
    this.modalRef = this.modalService.open(TransfusionDialogComponent, { size: 'lg', container: 'nb-layout' });

    this.modalRef.componentInstance.titulo = 'Eliminar Registro';
    this.modalRef.componentInstance.mensaje = '¿Desea eliminar el registro?';
    this.modalRef.result.then((data) => {
      this.service.eliminarPorId(value.data.cod_transfusion)
          .subscribe(
          data => {
            if (data){
              this.showToast("info", "Transfusión", "Registro eliminado exitosamente.");
              this.getAll();        
            }else{
              this.showToast("error", "Error", "No fue posible eliminar el registro.");
            }
            
          },
          error => {
            if (error != "undefined"){
              this.showToast("error", "Error", error);
            }
            this.getAll();
          },
          () => {

      });
    }, (reason) => {
     
    });
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
