import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbToastrConfig } from '@nebular/theme/components/toastr/toastr-config';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { TipoCambioService } from '../../../@core/data/tipo-cambio.service';
import { Divisa } from '../../../@core/modelos/divisa';
import { IndexModalComponent } from './index-modal.component';

@Component({
  selector: "ngx-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  private items: Divisa[];
  public item = new Divisa();

  //Modales
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
    private toastrService: NbToastrService,
    private _builder: FormBuilder,
    private modalService: NgbModal,
    private service: TipoCambioService
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
      codDivisa: {
        title: "ID",
        type: "number",
      },
      tipoCambio: {
        title: "Tipo de Cambio",
        type: "number",
      },
    },
  };

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getDivisas().subscribe(
      (items) => {
        this.items = items;
        this.source.load(this.items);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  editarRegistro(value) {
    this.modalRef = this.modalService.open(IndexModalComponent, {
      size: "lg",
      container: "nb-layout",
    });

    this.service.getDivisa(value.data.codDivisa).subscribe(
      (data) => {
        this.modalRef.componentInstance.modalHeader =
          "Editar Tipo de Cambio";
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
