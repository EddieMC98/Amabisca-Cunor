import { Component } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';

import { DonacionService } from '../../../@core/data/donacion.service';
import { Donacion} from '../../../@core/modelos/donacion';
import { Observable } from "rxjs/Observable";
import { ViewCell } from 'ng2-smart-table';
import { DonacionModalComponent } from './donacion-modal.component';
import { DonacionDialogComponent} from './donacion-dialog.component';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-donacion',
  styleUrls: ['./donacion.component.scss'],
  templateUrl: './donacion.component.html',
})
export class DonacionComponent {
  source: LocalDataSource = new LocalDataSource();
  private items: Donacion[];
  public item = new Donacion();
  modalRef: NgbModalRef;
  config: ToasterConfig;
  position = 'toast-top-right';
  animationType = 'fade';
  timeout = 5000;
  toastsLimit = 5;
  

  constructor(private service: DonacionService, private modalService: NgbModal, private toasterService: ToasterService, private router: Router) {  }

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
      cod_donacion: {
        title: 'ID',
        type: 'number',
        filter: false,
      },
      no_donacion: {
        title: 'No. Donación',
        type: 'number',
        filter: false,
      },
      barcode: {
        title: 'Código de Barra',
        type: 'number',
        filter: false,
      },
      cod_estado: {
        title: 'Estado',
        valuePrepareFunction: (estado) => { 
            if (estado ==1){
              return "Donador Aceptado";
            }else if (estado == 2){
              return "Donador Diferido";
            }else if (estado == 3){
              return "Donador Rechazado";
            }
         },
        filter: false
      },
      fec_donacion: {
        title: 'Fecha de donacion',
        valuePrepareFunction: (date) => {
          var raw = date.split("-");
          var fecha = raw[2] + "/" + raw[1] + "/"+raw[0]
          return fecha;
        },
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
        field: 'barcode',
        search: query
      },
      {
        field: 'no_donacion',
        search: query
      },
      {
        field: 'fec_donacion',
        search: query
      }
    ], false); 
  }

  nuevoRegistro() {
    this.modalRef = this.modalService.open(DonacionModalComponent, { size: 'lg', container: 'nb-layout' });

    this.modalRef.componentInstance.modalHeader = 'Nuevo Registro';
    this.modalRef.componentInstance.item = new Donacion();
    this.modalRef.componentInstance.esNuevo = true;
    var raw = new Date();
    this.modalRef.componentInstance.fec_creacion = {
      year: raw.getFullYear(), 
      month: raw.getMonth()+1, 
      day: raw.getDate()
    };

    this.modalRef.result.then((data) => {
      this.showToast("info", "Guardar", data);
      this.getAll();
    }, (reason) => {
      if (`${this.getDismissReason(reason)}` != "undefined"){
        this.showToast("error", "Error", `${this.getDismissReason(reason)}`);
      }
      
      this.getAll();
    });
  }

  editarRegistro(value) {
    this.router.navigate(['pages/operaciones/donacion/ver', value.data.cod_donacion]); 
  }

  eliminarRegistro(value) {
    this.modalRef = this.modalService.open(DonacionDialogComponent, { size: 'lg', container: 'nb-layout' });

    this.modalRef.componentInstance.titulo = 'Eliminar Registro';
    this.modalRef.componentInstance.mensaje = '¿Desea eliminar el registro?';
    this.modalRef.result.then((data) => {
      this.service.eliminarPorId(value.data.cod_donacion)
          .subscribe(
          data => {
            if (data){
              this.showToast("info", "Donación", "Registro eliminado exitosamente.");
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
