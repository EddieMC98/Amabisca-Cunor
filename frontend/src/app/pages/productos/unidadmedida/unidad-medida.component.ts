import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BodyOutputType, Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { LocalDataSource } from 'ng2-smart-table';
import { UnidadMedidaService } from '../../../@core/data/unidad-medida.service';
import { UnidadMedida } from '../../../@core/modelos/unidad-medida';
import { UnidadMedidaModalComponent } from './unidad-medida-modal.component';

@Component({
  selector: 'ngx-unidad-medida',
  templateUrl: './unidad-medida.component.html',
})

export class UnidadMedidaComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  private items: UnidadMedida[];
  public item = new UnidadMedida();
  modalRef: NgbModalRef;

  config: ToasterConfig;

    position = 'toast-top-right';
    animationType = 'fade';
    timeout = 5000;
    toastsLimit = 5;

  constructor(private service: UnidadMedidaService, private modalService: NgbModal, private toasterService: ToasterService, private datePipe: DatePipe, private router: Router) {  }

  settings = {
    mode : 'external',
    actions : {
        position : 'right',
        add:false,
        delete:false,
        columnTitle: "Acciones",
        custom: [

        ]
    },
    edit:  {
      confirmSave: true,
      editButtonContent: '<i class="fas fa-user-edit"></i>',
    },
    columns: {
      codUnidadMedida: {
        title: 'ID',
        type: 'number',

      },
      nombreUnidadMedida: {
        title: 'Nombre',
        type: 'string',

      },
      estadoActivo: {
        title: 'Estado',
        valuePrepareFunction: (value) => { return value === 1 ? 'Habilitado' : 'No habilitado' },
        filter: {
          type: 'list',
          config: {
            selectText: 'Estado',
            list: [
              { value: '0', title: 'Deshabilitado' },
              { value: '1', title: 'Habilitado' },

            ],
          },
        },
      },
    },
  };

  ngOnInit() { //when component loading get all users and set the users[]
    this.getAll();
  }

  getAll() {
    this.service.getUnidades().subscribe(
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
        field: 'nombreUnidadMedida',
        search: query
      },
    ], false);
  }

  nuevoRegistro() {
    this.modalRef = this.modalService.open(UnidadMedidaModalComponent, { size: 'lg', container: 'nb-layout' });

    this.modalRef.componentInstance.modalHeader = 'Nueva Unidad de Medida';
    this.modalRef.componentInstance.item = new UnidadMedida();
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
    this.modalRef = this.modalService.open(UnidadMedidaModalComponent, { size: 'lg', container: 'nb-layout' });

    this.service.getUnidad(value.data.codUnidadMedida)
        .subscribe(
        data => {
            this.modalRef.componentInstance.modalHeader = 'Editar Unidad de Medida';
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
     value.data.cod_rol
     this.router.navigate(['pages/seguridad/permisos', value.data.codUnidadMedida]);
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
