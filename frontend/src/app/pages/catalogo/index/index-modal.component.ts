import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from "@nebular/theme";
import { NbToastStatus } from "@nebular/theme/components/toastr/model";
import { NbToastrConfig } from "@nebular/theme/components/toastr/toastr-config";
import {
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import {
  BodyOutputType,
  Toast,
  ToasterConfig,
  ToasterService,
} from "angular2-toaster";
import { ProductoService } from "../../../@core/data/producto.service";
import { ProductoAux } from "../../../@core/modelos/Varios/producto-aux";

declare var window: ProductoAux;

@Component({
  selector: "ngx-index-modal",
  templateUrl: "./index-modal.component.html",
  styleUrls: ["./index-modal.component.scss"],
})
export class IndexModalComponent implements OnInit {
  public item = new ProductoAux();
  modalHeader: string;
  public esNuevo: Boolean = false;

  //declaración de variables
  public idProducto: number;
  public listaCarrita = new ProductoAux();

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
    private activeModal: NgbActiveModal,
    private service: ProductoService,
    private toastrService: NbToastrService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {}

  guardar(id: number) {
    console.log("Se agrega a carrito");
    this.idProducto = id;
    this.listaCarrita.codProducto = this.idProducto;
  }

  addProducto() {
    let productos = [];
    let bandera: boolean = true;
    if (localStorage.getItem("Productos")) {
      productos = JSON.parse(localStorage.getItem("Productos"));
      bandera = false;
      //IF PARA COMPROBAR SI YA EXISTE UN PRODUCTO
      productos.forEach((element) => {
        if (element.codProducto == this.item.codProducto) {
          this.showToast(
            NbToastStatus.WARNING,
            "Advertencia",
            "¡Este producto  ya esta en el carrito de compras!"
          );;
          bandera = true;
        }
      });

      if (bandera) {
      } else {
        productos = [this.item, ...productos];
        this.showToast(
          NbToastStatus.SUCCESS,
          "Registro",
          "¡Se ha añadido el producto al carrito de compras!"
        );
      }
    } else {
      productos = [this.item];
    }
    localStorage.setItem("Productos", JSON.stringify(productos));
    this.closeModal();
  }

  closeModal() {
    this.activeModal.dismiss();
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
