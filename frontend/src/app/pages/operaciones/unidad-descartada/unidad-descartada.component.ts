import { Component } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';

import { UnidadDescartadaService } from '../../../@core/data/unidad-descartada.service';
import { UnidadDescartada} from '../../../@core/modelos/unidad-descartada';
import { Observable } from "rxjs/Observable";
import { ViewCell } from 'ng2-smart-table';
import { UnidadDescartadaModalComponent } from './unidad-descartada-modal.component';
import { UnidadDescartadaDialogComponent} from './unidad-descartada-dialog.component';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { DatePipe } from '@angular/common';
import { TipoSangreService } from '../../../@core/data/tipo-sangre.service';
import { TipoSangre } from '../../../@core/modelos/tipo-sangre';

@Component({
  selector: 'ngx-unidad-descartada',
  styleUrls: ['./unidad-descartada.component.scss'],
  templateUrl: './unidad-descartada.component.html',
})
export class UnidadDescartadaComponent {
  source: LocalDataSource = new LocalDataSource();
  private items: UnidadDescartada[];
  public item = new UnidadDescartada();
  modalRef: NgbModalRef;
  config: ToasterConfig;
  position = 'toast-top-right';
  animationType = 'fade';
  timeout = 5000;
  toastsLimit = 5;
  

  constructor(private service: UnidadDescartadaService, private modalService: NgbModal, private toasterService: ToasterService) {  }

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
      cod_uni_desc: {
        title: 'ID',
        type: 'number',
        filter: false,
      },
      cantidad: {
        title: 'Unidades descartadas',
        type: 'number',
        filter: false,
      },
      fec_creacion: {
        title: 'Fecha de creación',
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
        field: 'nombre',
        search: query
      }
    ], false); 
  }

  nuevoRegistro() {
    this.modalRef = this.modalService.open(UnidadDescartadaModalComponent, { size: 'lg', container: 'nb-layout' });

    this.modalRef.componentInstance.modalHeader = 'Nuevo Registro';
    this.modalRef.componentInstance.item = new UnidadDescartada();
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
    this.modalRef = this.modalService.open(UnidadDescartadaModalComponent, { size: 'lg', container: 'nb-layout' });

    this.service.findById(value.data.cod_uni_desc)
        .subscribe(
        data => {
            this.modalRef.componentInstance.modalHeader = 'Editar Registro';
            this.modalRef.componentInstance.item = data;
            this.modalRef.componentInstance.esNuevo = false;
            var raw = new Date(data.fec_creacion);
            this.modalRef.componentInstance.fec_creacion = {
              year: raw.getFullYear(), 
              month: raw.getMonth()+1, 
              day: raw.getDate()
            };
            
            this.modalRef.result.then((data) => {
              this.showToast("info", "Editar", data);
              this.getAll();
            }, (reason) => {
              if (`${this.getDismissReason(reason)}` != "undefined"){
                this.showToast("error", "Error", `${this.getDismissReason(reason)}`);
              }
              this.getAll();
            });
        },
        error => {
          //console.log(error);
        },
        () => {

    });    
  }

  eliminarRegistro(value) {
    this.modalRef = this.modalService.open(UnidadDescartadaDialogComponent, { size: 'lg', container: 'nb-layout' });

    this.modalRef.componentInstance.titulo = 'Eliminar Registro';
    this.modalRef.componentInstance.mensaje = '¿Desea eliminar el registro?';
    this.modalRef.result.then((data) => {
      this.service.eliminarPorId(value.data.cod_uni_desc)
          .subscribe(
          data => {
            if (data){
              this.showToast("info", "Unidades descartadas", "Registro eliminado exitosamente.");
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
