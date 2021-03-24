import { Component, OnInit } from "@angular/core";
import {
  ToasterService,
  ToasterConfig,
  Toast,
  BodyOutputType,
} from "angular2-toaster";
import { DatePipe } from "@angular/common";
import { LocalDataSource } from "ng2-smart-table";
import {
  NgbModal,
  NgbModalRef,
  ModalDismissReasons,
} from "@ng-bootstrap/ng-bootstrap";
import { TipoEnvioService } from "../../../@core/data/tipo-envio.service";
import { TipoEnvioModalComponent } from "./tipo-envio-modal.component";

import { TipoEnvio } from "../../../@core/modelos/tipoenvio";
import { Observable } from "rxjs/Observable";

import "style-loader!angular2-toaster/toaster.css";

@Component({
  selector: "ngx-tipo-envio",
  templateUrl: "./tipo-envio.component.html",
  styleUrls: ["./tipo-envio.component.scss"],
})
export class TipoEnvioComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  private items: TipoEnvio[];
  public item = new TipoEnvio();
  modalRef: NgbModalRef;

  config: ToasterConfig;

  position = "toast-top-right";
  animationType = "fade";
  timeout = 5000;
  toastsLimit = 5;

  constructor(
    private service: TipoEnvioService,
    private modalService: NgbModal,
    private toasterService: ToasterService,
    private datePipe: DatePipe
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
      codTipoEnvio: {
        title: "ID",
        type: "number",
        filter: false,
      },
      nombreTipoEnvio: {
        title: "Nombre",
        type: "string",
        filter: false,
      },
      costoEnvio: {
        title: "Costo Envio (Q.)",
        type: "number",
        filter: false,
      },
    },
  };
  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.findAll().subscribe(
      (items) => {
        this.items = items;
        this.source.load(this.items);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSearch(query: string = "") {
    console.log(query);
    this.source.setFilter(
      [
        {
          field: "nombreTipoEnvio",
          search: query,
        },
      ],
      false
    );
  }

  nuevoRegistro() {
    this.modalRef = this.modalService.open(TipoEnvioModalComponent, {
      size: "lg",
      container: "nb-layout",
    });

    this.modalRef.componentInstance.modalHeader = "Nuevo Tipo de Envio";
    this.modalRef.componentInstance.item = new TipoEnvio();
    this.modalRef.componentInstance.item.costoEnvio = 0.00;
    this.modalRef.componentInstance.esNuevo = true;
    this.modalRef.result.then(
      (data) => {
        this.showToast("info", "Guardar", data);
        this.getAll();
      },
      (reason) => {
        if (`${this.getDismissReason(reason)}` != "undefined") {
          this.showToast("error", "Error", `${this.getDismissReason(reason)}`);
        }

        this.getAll();
      }
    );
  }

  editarRegistro(value) {
    this.modalRef = this.modalService.open(TipoEnvioModalComponent, {
      size: "lg",
      container: "nb-layout",
    });

    this.service.findById(value.data.codTipoEnvio).subscribe(
      (data) => {
        this.modalRef.componentInstance.modalHeader = "Editar Tipo de Envio";
        this.modalRef.componentInstance.item = data;
        this.modalRef.componentInstance.esNuevo = false;
        this.modalRef.result.then(
          (data) => {
            this.showToast("info", "Editar", data);
            this.getAll();
          },
          (reason) => {
            if (`${this.getDismissReason(reason)}` != "undefined") {
              this.showToast(
                "error",
                "Error",
                `${this.getDismissReason(reason)}`
              );
            }
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

  eliminarRegistro(value) {
    // this.modalRef = this.modalService.open(TipoEnvioModalComponent, { size: 'lg', container: 'nb-layout' });
    // this.modalRef.componentInstance.titulo = 'Eliminar Registro';
    // this.modalRef.componentInstance.mensaje = '¿Desea eliminar el registro?';
    // this.modalRef.result.then((data) => {
    //   this.service.eliminarPorId(value.data.cod_marca)
    //       .subscribe(
    //       data => {
    //         if (data){
    //           this.showToast("info", "Marcas", "Registro eliminado exitosamente.");
    //           this.getAll();
    //         }else{
    //           this.showToast("error", "Error", "No fue posible eliminar el registro.");
    //         }
    //       },
    //       error => {
    //         if (error != "undefined"){
    //           this.showToast("error", "Error", error);
    //         }
    //         this.getAll();
    //       },
    //       () => {
    //   });
    // }, (reason) => {
    // });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "";
    } else {
      return `${reason}`;
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
