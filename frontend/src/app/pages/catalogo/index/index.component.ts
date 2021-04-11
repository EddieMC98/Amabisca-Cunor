import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import {
  BodyOutputType,
  Toast,
  ToasterConfig,
  ToasterService,
} from "angular2-toaster";
import { IndexService } from "../../../@core/data/index.service";
import { ProductoService } from "../../../@core/data/producto.service";
import { ProductoAux } from "../../../@core/modelos/Varios/producto-aux";
import { IndexModalComponent } from "./index-modal.component";

@Component({
  selector: "ngx-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
  private items: ProductoAux[];
  public item = new ProductoAux();
  public id_producto: number;
  //Modal
  modalRef: NgbModalRef;

  config: ToasterConfig;

  position = "toast-top-right";
  animationType = "fade";
  timeout = 5000;
  toastsLimit = 5;

  constructor(
    private service: IndexService,
    private modalService: NgbModal,
    private toasterService: ToasterService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.verProductos().subscribe(
      (items) => {
        //console.log(items);
        this.items = items;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  verDetalles(id: number) {}
  detProd(id: number) {
    // console.log(id);

    this.modalRef = this.modalService.open(IndexModalComponent, {
      size: "lg",
      container: "nb-layout",
    });

    this.service.verProducto(id).subscribe(
      (data) => {
        this.modalRef.componentInstance.modalHeader = "Detalle de Producto";
        this.modalRef.componentInstance.item = data[0];
        this.modalRef.componentInstance.esNuevo = false;
        this.modalRef.result.then(
          (data) => {
            this.showToast("info", "Detalle Registro", data);
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
