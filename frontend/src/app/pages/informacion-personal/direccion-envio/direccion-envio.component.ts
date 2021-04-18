import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbToastrConfig } from '@nebular/theme/components/toastr/toastr-config';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { DireccionEnvioService } from '../../../@core/data/direccion-envio.service';
import { InfoPersonalService } from '../../../@core/data/info-personal.service';
import { UsuarioService } from '../../../@core/data/usuarios.service';
import { DireccionEnvio } from '../../../@core/modelos/direeccion-envio';
import { Usuario } from '../../../@core/modelos/usuario';
import { DireccionEnvioModalComponent } from './direccion-envio-modal.component';

@Component({
  selector: "ngx-direccion-envio",
  templateUrl: "./direccion-envio.component.html",
  styleUrls: ["./direccion-envio.component.scss"],
})
export class DireccionEnvioComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  private items: DireccionEnvio[];
  public item = new DireccionEnvio();
  public item_aux = new Usuario();
  modalRef: NgbModalRef;
  //Empieza Configuración Toastr
  config: NbToastrConfig;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  //Termina Configuración Toastr

  constructor(
    private service: DireccionEnvioService,
    private service_aux: UsuarioService,
    private service_clint: InfoPersonalService,
    private toastrService: NbToastrService,
    private _builder: FormBuilder,
    private modalService: NgbModal
  ) {}

  settings = {
    mode: "external",
    actions: {
      position: "right",
      add: false,
      delete: false,
      columnTitle: "Acciones",
      custom: [],
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="fas fa-user-edit"></i>',
    },
    columns: {
      codDireccionEnvio: {
        title: "ID",
        type: "number",
      },
      direccion: {
        title: "Nombre",
        type: "string",
      },
    },
  };

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service_aux.findByIdPerfil().subscribe(
      (data) => {
        this.item_aux = data;
        this.service_clint.getCliente(this.item_aux.cod_usuario).subscribe(
          (data2) => {
            this.service.getDirecciones(data2[0].codCliente).subscribe(
              (items) => {
                console.log(items);
                this.items = items;
                this.source.load(this.items);
              },
              (err) => {
                console.log(err);
              }
            );
          },
          (error) => {
            //console.log(error);
          },
          () => {}
        );
      },
      (error) => {
        //console.log(error);
      },
      () => {}
    );
  }
  nuevoRegistro() {
    this.modalRef = this.modalService.open(DireccionEnvioModalComponent, {
      size: "lg",
      container: "nb-layout",
    });

    this.modalRef.componentInstance.modalHeader = "Nueva Dirección de Envío";
    this.modalRef.componentInstance.item = new DireccionEnvio();
    this.modalRef.componentInstance.esNuevo = true;
    this.service_aux.findByIdPerfil().subscribe(
      (data) => {
        this.service_clint.getCliente(data.cod_usuario).subscribe(
          (data2) => {
            this.modalRef.componentInstance.codUsuario = data.cod_usuario;
            this.modalRef.componentInstance.codCliente = data2[0].codCliente;
          },
          (error) => {
            //console.log(error);
          },
          () => {}
        );
      },
      (error) => {
        //console.log(error);
      },
      () => {}
    );

    this.modalRef.result.then(
      (data) => {
        
        this.getAll();
      },
      (reason) => {
        this.getAll();
      }
    );
  }

  editarRegistro(value) {
    this.modalRef = this.modalService.open(DireccionEnvioModalComponent, {
      size: "lg",
      container: "nb-layout",
    });

    this.service.getDireccion(value.data.codDireccionEnvio).subscribe(
      (data) => {
        this.modalRef.componentInstance.modalHeader =
          "Editar Dirección de Envío";
        this.modalRef.componentInstance.item = data;
        this.modalRef.componentInstance.esNuevo = false;
        this.modalRef.result.then(
          (data) => {
            this.getAll();
          },
          (reason) => {
            this.getAll();
          }
        );
      },
      (error) => {
        //console.log(error);
      },
      () => {}
    );
  }

  //Empieza método Toastr
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : "";

    this.index += 1;
    this.toastrService.show(body, `${titleContent}`, config);
  }
  //Termina método Toastr
}
