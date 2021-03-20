import { Component } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';

import { UsuarioService } from '../../../@core/data/usuarios.service';
import { Usuario} from '../../../@core/modelos/usuario';
import { Observable } from "rxjs/Observable";
import { ViewCell } from 'ng2-smart-table';
import { UsuariosModalComponent } from './usuarios-modal.component';
import { UsuariosDialogComponent} from './usuarios-dialog.component';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { DatePipe, JsonPipe } from '@angular/common';
import 'style-loader!angular2-toaster/toaster.css';
import { Estado } from '../../../@core/modelos/estado';

@Component({
  selector: 'ngx-usuarios',
  styleUrls: ['./usuarios.component.scss'],
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent {
  source: LocalDataSource = new LocalDataSource();
  private items: Usuario[];
  public item = new Usuario();
  modalRef: NgbModalRef;

  config: ToasterConfig;

    position = 'toast-top-right';
    animationType = 'fade';
    timeout = 5000;
    toastsLimit = 5;

  constructor(private service: UsuarioService, private modalService: NgbModal, private toasterService: ToasterService, private datePipe: DatePipe) {  }

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
        deleteButtonContent: '<i mdTooltip="Eliminar" class="fa fa-trash" ></i>'
    },
    columns: {
      cod_usuario: {
        title: 'ID',
        type: 'number',
        filter: false,
      },
      nombre_completo: {
        title: 'Nombre',
        type: 'string',
        filter: false
      },
      correo_electronico: {
        title: 'Correo electrónico',
        type: 'string',
        filter: false
      },
      estado: {
        title: 'Estado',
        valuePrepareFunction: (value) => { return value === 1 ? 'Habilitado' : 'No habilitado' },
        filter: false
      },
      fec_creacion: {
        title: 'Fecha de creación',
        valuePrepareFunction: (date) => {
          var raw = date.split("-");
          var day = raw[2].split("T");
          var fecha = day[0] + "/" + raw[1] + "/"+raw[0]
          return fecha;
        },
        sortDirection: 'desc',
        filter: false
      },
    },
  };

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
        field: 'nombre_completo',
        search: query
      },
      {
        field: 'correo_electronico',
        search: query
      },
    ], false);
  }

  nuevoRegistro() {
    this.modalRef = this.modalService.open(UsuariosModalComponent, { size: 'lg', container: 'nb-layout' });

    this.modalRef.componentInstance.modalHeader = 'Nuevo Usuario';
    this.modalRef.componentInstance.item = new Usuario();
    this.modalRef.componentInstance.esNuevo = true;
    this.modalRef.result.then((data) => {

      console.log(data);
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
    this.modalRef = this.modalService.open(UsuariosModalComponent, { size: 'lg', container: 'nb-layout' });

    this.service.findById(value.data.cod_usuario)
        .subscribe(
        data => {
            this.modalRef.componentInstance.modalHeader = 'Editar Usuario';
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



  onDelete(value){
    var y: number = +value.data.cod_usuario;
    if(confirm('¿Está seguro de eliminar el usuario?'+ y))
    {
      this.service.deleteUser(y)
    .subscribe(
      res=>{
        this.showToast("info", "Eliminado", ""+y);
        this.getAll();
    },

      err=>{console.log(err)}
    )
    }

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
