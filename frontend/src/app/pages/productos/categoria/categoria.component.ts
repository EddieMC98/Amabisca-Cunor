import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { CategoriaService } from '../../../@core/data/categoria.service';
import { Rol} from '../../../@core/modelos/rol';
import { Observable } from "rxjs/Observable";
import { ViewCell } from 'ng2-smart-table';
import { CategoriasModalComponent } from './categorias-modal.component';
//import { RolesDialogComponent} from './roles-dialog.component';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import 'style-loader!angular2-toaster/toaster.css';
import {Router} from "@angular/router";
import { Categoria } from '../../../@core/modelos/categoria';
@Component({
  selector: 'ngx-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  private items: Categoria[];
  public item = new Categoria();
  modalRef: NgbModalRef;

  config: ToasterConfig;

    position = 'toast-top-right';
    animationType = 'fade';
    timeout = 5000;
    toastsLimit = 5;

  constructor(private service: CategoriaService, private modalService: NgbModal, private toasterService: ToasterService, private datePipe: DatePipe, private router: Router) {  }

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
      codCategoria: {
        title: 'ID',
        type: 'number',
        
      },
      nombreCategoria: {
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
    this.service.getCategorias().subscribe(
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
        field: 'nombreCategoria',
        search: query
      },
    ], false);
  }

  nuevoRegistro() {
    this.modalRef = this.modalService.open(CategoriasModalComponent, { size: 'lg', container: 'nb-layout' });

    this.modalRef.componentInstance.modalHeader = 'Nueva Categoría';
    this.modalRef.componentInstance.item = new Rol();
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
    this.modalRef = this.modalService.open(CategoriasModalComponent, { size: 'lg', container: 'nb-layout' });

    this.service.getCategoria(value.data.codCategoria)
        .subscribe(
        data => {
            this.modalRef.componentInstance.modalHeader = 'Editar Categoria';
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
     this.router.navigate(['pages/seguridad/permisos', value.data.cod_rol]);
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
