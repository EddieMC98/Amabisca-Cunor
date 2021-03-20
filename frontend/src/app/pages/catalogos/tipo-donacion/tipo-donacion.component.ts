import { Component } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { TipoDonacionService } from '../../../@core/data/tipo-donacion.service';
import { TipoDonacion} from '../../../@core/modelos/tipo-donacion';
import { Observable } from "rxjs/Observable";
import { ViewCell } from 'ng2-smart-table';
import { TipoDonacionModalComponent } from './tipo-donacion-modal.component';
import { TipoDonacionDialogComponent} from './tipo-donacion-dialog.component';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-tipo-donacion',
  styleUrls: ['./tipo-donacion.component.scss'],
  templateUrl: './tipo-donacion.component.html',
})
export class TipoDonacionComponent {
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
      cod_tipo_donacion: {
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
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  private items: TipoDonacion[];
  public item = new TipoDonacion();
  modalRef: NgbModalRef;

  config: ToasterConfig;
  
    position = 'toast-top-right';
    animationType = 'fade';
    timeout = 5000;
    toastsLimit = 5;

  constructor(private service: TipoDonacionService, private modalService: NgbModal, private toasterService: ToasterService) {  }

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
    this.modalRef = this.modalService.open(TipoDonacionModalComponent, { size: 'lg', container: 'nb-layout' });

    this.modalRef.componentInstance.modalHeader = 'Nuevo Tipo de Donación';
    this.modalRef.componentInstance.item = new TipoDonacion();
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
    this.modalRef = this.modalService.open(TipoDonacionModalComponent, { size: 'lg', container: 'nb-layout' });

    this.service.findById(value.data.cod_tipo_donacion)
        .subscribe(
        data => {
            this.modalRef.componentInstance.modalHeader = 'Editar Tipo de Descarte';
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
    this.modalRef = this.modalService.open(TipoDonacionDialogComponent, { size: 'lg', container: 'nb-layout' });

    this.modalRef.componentInstance.titulo = 'Eliminar Registro';
    this.modalRef.componentInstance.mensaje = '¿Desea eliminar el registro?';
    this.modalRef.result.then((data) => {
      this.service.eliminarPorId(value.data.cod_tipo_donacion)
          .subscribe(
          data => {
            if (data){
              this.showToast("info", "Tipo de donación", "Registro eliminado exitosamente.");
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
