import { Component } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';

import { TipoServicioService } from '../../../@core/data/tipo-servicio.service';
import { TipoServicio} from '../../../@core/modelos/tipo-servicio';
import { Observable } from "rxjs/Observable";
import { ViewCell } from 'ng2-smart-table';
import { TipoServicioModalComponent } from './tipo-servicio-modal.component';
import { TipoServicioDialogComponent} from './tipo-servicio-dialog.component';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-tipo-servicio',
  styleUrls: ['./tipo-servicio.component.scss'],
  templateUrl: './tipo-servicio.component.html',
})
export class TipoServicioComponent {
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
      cod_servicio: {
        title: 'ID',
        type: 'number',
        filter: false,
      },
      nombre: {
        title: 'Nombre',
        type: 'string',
        filter: false
      },
      estado: {
        title: 'Estado',
        valuePrepareFunction: (value) => { return value === 1 ? 'Habilitado' : 'No habilitado' },
        filter: false
      },
      edad_servicio: {
        title: 'Edad de atención',
        type: 'number',
        filter: false,
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  private items: TipoServicio[];
  public item = new TipoServicio();
  modalRef: NgbModalRef;

  config: ToasterConfig;
  
    position = 'toast-top-right';
    animationType = 'fade';
    timeout = 5000;
    toastsLimit = 5;

  constructor(private service: TipoServicioService, private modalService: NgbModal, private toasterService: ToasterService) {  }

  ngOnInit() { //when component loading get all users and set the users[]
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
    this.modalRef = this.modalService.open(TipoServicioModalComponent, { size: 'lg', container: 'nb-layout' });

    this.modalRef.componentInstance.modalHeader = 'Nuevo Tipo de Servicio';
    this.modalRef.componentInstance.item = new TipoServicio();
    this.modalRef.componentInstance.esNuevo = true;
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
    this.modalRef = this.modalService.open(TipoServicioModalComponent, { size: 'lg', container: 'nb-layout' });

    this.service.findById(value.data.cod_servicio)
        .subscribe(
        data => {
            this.modalRef.componentInstance.modalHeader = 'Editar Tipo de Servicio';
            this.modalRef.componentInstance.item = data;
            this.modalRef.componentInstance.esNuevo = false;
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
    this.modalRef = this.modalService.open(TipoServicioDialogComponent, { size: 'lg', container: 'nb-layout' });

    this.modalRef.componentInstance.titulo = 'Eliminar Registro';
    this.modalRef.componentInstance.mensaje = '¿Desea eliminar el registro?';
    this.modalRef.result.then((data) => {
      this.service.eliminarPorId(value.data.cod_servicio)
          .subscribe(
          data => {
            if (data){
              this.showToast("info", "Tipo de Servicio", "Registro eliminado exitosamente.");
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
