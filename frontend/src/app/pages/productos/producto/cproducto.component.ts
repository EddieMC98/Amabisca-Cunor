import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToasterService } from "angular2-toaster";
import { ProductoService } from "../../../@core/data/producto.service";
import { Producto } from "../../../@core/modelos/producto";
import { ModalDismissReasons, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { BodyOutputType, Toast, ToasterConfig } from "angular2-toaster";
import { LocalDataSource } from "ng2-smart-table";

import "style-loader!angular2-toaster/toaster.css";
import { ProductoModalComponent } from "./producto-modal.component";
import { ProductoAux } from "../../../@core/modelos/Varios/producto-aux";
import { APPCONFIG } from "../../../@core/constantes.module";

@Component({
  selector: "ngx-producto",
  templateUrl: "./producto.component.html",
  styleUrls: ["./producto.component.scss"],
})
export class CProductoComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  private items: ProductoAux[];
  public item = new ProductoAux();
  modalRef: NgbModalRef;
  url = APPCONFIG.BASE_URL_IMG + "";
  config: ToasterConfig;

  position = "toast-top-right";
  animationType = "fade";
  timeout = 5000;
  toastsLimit = 5;

  constructor(
    private service: ProductoService,
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
      codProducto: {
        title: "Cod",
        type: "number",
      },
      nombreProducto: {
        title: "Producto",
        type: "string",
      },
      codigoProducto: {
        title: "Código Producto",
        type: "string",
      },
      precioCosto: {
        title: "Precio Costo (Q.)",
        type: "number",
      },
      precioVenta: {
        title: "Precio Venta (Q.)",
        type: "string",
      },
      imagenProducto: {
        title: "Imagen",
        filter:false,
        type: "html",
        valuePrepareFunction: (value) => {
          return (
            '<img width="100px"; height="100px" src= ' +
            this.url+"Resources/Images/" +
            value +
            "  />"
          );
        },

      },
      detalleProducto: {
        title: "Descripción",
        type: "string",
      },
      categoria: {
        title: "Categoria",
        type: "string",
      },
      marca: {
        title: "Marca",
        type: "string",
      },
      unidadMedida: {
        title: "Unidad Medida",
        type: "string",
      },
      estadoActivo: {
        title: "Estado",
        valuePrepareFunction: (value) => {
          return value === 1 ? "Habilitado" : "No habilitado";
        },
        filter: {
          type: "list",
          config: {
            selectText: "Estado",
            list: [
              { value: "0", title: "Deshabilitado" },
              { value: "1", title: "Habilitado" },
            ],
          },
        },
      },
    },
  };

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.verProductos().subscribe(
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
        // fields we want to include in the search
        {
          field: "nombreProducto",
          search: query,
        },
      ],
      false
    );
  }

  nuevoRegistro() {
    this.modalRef = this.modalService.open(ProductoModalComponent, {
      size: "lg",
      container: "nb-layout",
    });

    this.modalRef.componentInstance.modalHeader = "Nuevo Producto";
    this.modalRef.componentInstance.item = new Producto();
    this.modalRef.componentInstance.item.estadoActivo = 1;
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
    this.modalRef = this.modalService.open(ProductoModalComponent, {
      size: "lg",
      container: "nb-layout",
    });

    this.service.findById(value.data.codProducto).subscribe(
      (data) => {
        this.modalRef.componentInstance.modalHeader = "Editar Producto";
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
